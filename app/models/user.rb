class User < ActiveRecord::Base
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
  
  def add_competence(competence, level)
    ActiveRecord::Base.transaction do
      self.assigned_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.where(competence: competence).delete_all
      self.assigned_competence_levels.create(competence: competence, level: level)
    end
  end
  
  def add_pending_competence(pending_competence, level)
    ActiveRecord::Base.transaction do
      self.assigned_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.where(competence: competence).delete_all
      self.pending_competence_levels.create(competence: pending_competence, level: level)
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
  
  def has_authority_over(other)
    return true if self.has_role?(:admin)
    return true if self.followers.include?(other)
  end
end
