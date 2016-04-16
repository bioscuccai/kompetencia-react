class User < ActiveRecord::Base
  resourcify
  
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :godfather, foreign_key: :godfather_id, class_name: 'User'
  has_many :followers, foreign_key: :godfather_id, class_name: 'User'
  
  has_many :pending_competence_levels
  has_many :pending_competences, through: :pending_competence_levels, class_name: 'Competence', source: :competence
  
  has_many :assigned_competence_levels
  has_many :competences, through: :assigned_competence_levels
  
  has_many :availabilities
  
  belongs_to :godfather, class_name: 'User', foreign_key: :godfather_id
  has_many :subordinates, class_name: 'User', foreign_key: :godfather_id
  
  has_many :person_requests
  has_many :targeted_requests, class_name: 'User', foreign_key: :target_id
  
  scope :has_level, ->(competence_id, level){joins(:assigned_competence_levels).where("assigned_competence_levels.level>=? AND assigned_competence_levels.competence_id=?", level, competence_id)}
  scope :free_between_closed, ->(start_at, ends_at){joins(:availabilities)}
  scope :free_between_open, ->(starts_at){all}
  
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
    self.assigned_competence_levels.where(competence: competence).delete_all
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
  
  def has_authority_over(other)
    return true if self.has_role?(:admin)
    return true if self.followers.include?(other)
  end
  
  def available?
    open_interval=self.availabilities.where("starts_at<? AND ends_at IS NULL", Time.now).count!=0
    closed_interval=self.availabilities.where("starts_at<? AND ends_at>?", Time.now, Time.now).count!=0
    open_interval || closed_interval
  end
end
