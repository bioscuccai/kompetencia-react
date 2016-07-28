class User < ActiveRecord::Base
  resourcify
  
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :godfather, foreign_key: :godfather_id, class_name: 'User'
  has_many :followers, foreign_key: :godfather_id, class_name: 'User'
  
  has_many :pending_competence_levels
  has_many :pending_competences, through: :pending_competence_levels, class_name: 'Competence', source: :competence
  
  has_many :users_skills
  has_many :skills, through: :users_skills, class_name: 'Skill', source: :skill
  
  has_many :assigned_competence_levels
  has_many :competences, through: :assigned_competence_levels
  
  has_many :availabilities
  
  belongs_to :godfather, class_name: 'User', foreign_key: :godfather_id
  has_many :subordinates, class_name: 'User', foreign_key: :godfather_id
  
  has_many :person_requests
  has_many :targeted_requests, class_name: 'User', foreign_key: :target_id
  
  has_many :saved_queries
  has_many :reports
  
  scope :has_skills, ->(skill_ids){joins(:users_skills).where("confirmed=? AND skill_id IN (?)", true, skill_ids)}
  scope :has_skills_unconfirmed, ->(skill_ids){joins(:users_skills).where("skill_id IN (?)", skill_ids)}
  scope :has_level, ->(competence_id, level){joins(:assigned_competence_levels).where("assigned_competence_levels.level>=? AND assigned_competence_levels.competence_id=?", level, competence_id)}
  scope :has_pending_level, ->(competence_id, level){joins(:pending_competence_levels).where("pending_competence_levels.level>=? AND pending_competence_levels.competence_id=?", level, competence_id)}
  
  scope :free_between_closed, ->(start_at, ends_at){joins(:availabilities)}
  scope :free_between_open, ->(starts_at){all}
  #scope :has_availability, ->(b_starts_at, b_ends_at){where("availabilities.starts_at<=:b_starts_at AND availabilities.ends_at>=:b_ends_at", b_starts_at: b_starts_at, b_ends_at: b_ends_at)}
  
  has_attached_file :cv
  validates_attachment_content_type :cv, :content_type=> ["application/x-download", "application/pdf; charset=binary", "application/pdf", "application/x-pdf", "application/acrobat", "applications/vnd.pdf", "text/pdf", "text/x-pdf"]
  
  def availabilities_between(b_starts_at, b_ends_at)
    Availability.where("user_id=:user_id AND availabilities.starts_at<=:b_starts_at AND availabilities.ends_at>=:b_ends_at", user_id: self.id, b_starts_at: b_starts_at, b_ends_at: b_ends_at)
  end
  
  def availabilities_between_not_strict(b_starts_at, b_ends_at)
    ans=Availability.where("user_id=?", self.id).collisions_not_strict(b_starts_at, b_ends_at)
    ans
  end
  
  def add_competence(competence, level)
    ActiveRecord::Base.transaction do
      self.assigned_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.where(competence: competence).delete_all
      self.assigned_competence_levels.create(competence: competence, level: level)
    end
  end
  
  def add_pending_competence(competence, level)
    ActiveRecord::Base.transaction do
      #self.assigned_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.create(competence: competence, level: level)
    end
  end
  
  def approve_pending_competence(pending_competence)
    ActiveRecord::Base.transaction do
      
    end
  end
  
  def remove_competence(competence)
    ActiveRecord::Base.transaction do
      self.assigned_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.where(competence: competence).delete_all
    end
  end
  
  def remove_pending_competence(competence)
    self.pending_competence_levels.where(competence: competence).delete_all
  end
  
  def accept_pending_competence(competence_id)
    competence=Competence.find competence_id
    level=self.pending_competence_levels.where(competence: competence).first.level
    ActiveRecord::Base.transaction do
      self.pending_competence_levels.where(competence: competence).delete_all
      self.assigned_competence_levels.where(competence: competence).delete_all
      self.assigned_competence_levels.create(level: level, competence: competence)
    end
  end
  
  def has_authority_over?(other)
    return true if self.has_role?(:admin)
    return true if self.has_role?(:godfather) && other.id==self.id
    return true if self.has_role?(:godfather) && other.godfather_id==self.id
  end
  
  def available?
    open_interval=self.availabilities.active_availabilities.where("starts_at<? AND ends_at IS NULL", Time.now).count!=0
    closed_interval=self.availabilities.active_availabilities.where("starts_at<? AND ends_at>?", Time.now, Time.now).count!=0
    open_interval || closed_interval
  end
  
  def name
    "#{self.last_name} #{self.first_name}"
  end
  
  def notification_pending_users
    [*self.followers.joins(:pending_competence_levels).where("pending_competence_levels.notified=false AND (pending_competence_levels.updated_at>last_seen_by_godfather OR last_seen_by_godfather IS NULL)"),
     *self.followers.joins(:users_skills).where("users_skills.updated_at>last_seen_by_godfather")].
    compact.
    uniq(&:id)
  end
  
  def notification_requested
    PersonRequest.where("user_id=? AND (updated_at>? OR ? IS NULL)", self.id, self.last_seen_requested, self.last_seen_requested)
  end
  
  def notification_relevant
    #PersonRequest.joins(:target).where("users.godfather_id=? AND (person_requests.updated_at>? OR ? IS NULL)", self.id, self.last_seen_relevant, self.last_seen_relevant)
    PersonRequest.joins(:target).where("users.godfather_id=? AND confirmed IS NULL", self.id)
  end
  
  def self.query params={}
    result_per_user=Hash.new{|h,k| h[k]=[]}
    users=[]
    user_availability_matches=[]
    
    res=[]
    res_with_date=[]
    
    base_query=User.includes(:assigned_competence_levels, :pending_competence_levels).includes(:availabilities, :godfather, assigned_competence_levels: [:competence])
    
    if params[:only_subordinates] && params[:subordinates_of]
      base_query=base_query.where(godfather_id: params[:subordinates_of].id)
    end
    
    if params[:selected_skill_ids] && params[:selected_skill_ids].count!=0
      if params[:show_pending]
        base_query=base_query.has_skills_unconfirmed(params[:selected_skill_ids])
      else
        base_query=base_query.has_skills(params[:selected_skill_ids])
      end
    end
        
    competence_ids=params[:competences] ? params[:competences].map{|c| c['competence_id']} : []
    
    #minden kompetencia stimmljen
    if params[:match_all]
      #assigned_users=User.joins(:assigned_competence_levels).where("assigned_competence_levels.competence_id IN (?)", competence_ids).to_a
      #pending_users=User.joins(:pending_competence_levels).where("pending_competence_levels.competence_id IN(?)", competence_ids).to_a
      
      assigned_users=[]
      pending_users=[]
      (params[:competences] || []).each do |c|
        curr_assigned=base_query.has_level(c['competence_id'], c['level'])
        assigned_users=assigned_users + curr_assigned
        if params[:show_pending]
          curr_pending=base_query.has_pending_level(c['competence_id'], c['level'])
          pending_users=pending_users + curr_pending
        end
      end
      
      #binding.pry
      
      #assigned_users.uniq!(&:id)
      #pending_users.uniq!(&:id)
      
      user_ids_=(assigned_users.map(&:id) + pending_users.map(&:id)).uniq
      proper_user_ids=[]
      user_ids_.each do |uid|
        matched_competence_count=0
        if params[:show_pending]
          matched_competence_count=assigned_users.select{|u| u.id==uid}.count + pending_users.select{|u| u.id==uid}.count
        else
          matched_competence_count=assigned_users.select{|u| u.id==uid}.count
        end
        
        if matched_competence_count >= (params[:competences] || []).count
          proper_user_ids.push uid
          #result_per_user[uid]=competence_ids
        end
      end
      
      res=User.includes(:assigned_competence_levels, :pending_competence_levels).where("id IN (?)", proper_user_ids)
    #nem kell minden kompetencianak stimmelni
    else
      if params[:competences].present?
        params[:competences].each do |c|
          res=res+(base_query.has_level(c['competence_id'], c['level']).to_a)
          if params[:show_pending]
            res=res + (base_query.has_pending_level(c['competence_id'], c['level']).to_a)
          end
        end
      else
        res=base_query
      end
    end
    
    res=res.uniq(&:id)
    
    #datumra szures
    if params[:check_date] && params[:starts_at].present? && params[:ends_at].present?
      res_with_date=res.select do |u|
        availability_matches=[]
        if params[:not_strict_search]
          availability_matches=u.availabilities_between_not_strict(Time.parse(params[:starts_at]), Time.parse(params[:ends_at]))
        else
          availability_matches=u.availabilities_between(Time.parse(params[:starts_at]), Time.parse(params[:ends_at]))
        end
        
        if availability_matches.count!=0
          user_availability_matches[u.id]=user_availability_matches.fetch(u.id, []) + availability_matches.map(&:id)
        end
        
        availability_matches.count!=0
      end
      
    else
      res_with_date=res
    end
    
    
    user_ids=(res_with_date.map{|u| u.id}).uniq
    
    users=User.includes(:availabilities, :skills, :users_roles, :users_skills, :assigned_competence_levels, :pending_competence_levels).where("id IN (?)", user_ids)
    users.each do |u|
     #(result_per_user[u.id]).push c["competence_id"]
      (params[:competences] || []).each do |c|
        if u.assigned_competence_levels.map{|acl| acl.competence_id}.include?(c["competence_id"]) || u.pending_competence_levels.map{|pcl| pcl.competence_id}.include?(c["competence_id"])
          result_per_user[u.id].push c["competence_id"]
        end
      end
    end

    return users, result_per_user, user_availability_matches
  end
end
