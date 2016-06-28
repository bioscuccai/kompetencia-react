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
  
  scope :has_skills, ->(skill_ids){joins(:users_skills).where("confirmed=? AND skill_id IN (?)", true, skill_ids)}
  scope :has_level, ->(competence_id, level){joins(:assigned_competence_levels).where("assigned_competence_levels.level>=? AND assigned_competence_levels.competence_id=?", level, competence_id)}
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
    PersonRequest.joins(:target).where("users.godfather_id=? AND (person_requests.updated_at>? OR ? IS NULL)", self.id, self.last_seen_relevant, self.last_seen_relevant)
  end
end
