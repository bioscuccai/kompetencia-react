class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  has_many :pending_competence_levels
  has_many :pending_competences, through: :pending_competence_levels, class_name: 'Competence', source: :competence
  
  has_many :assigned_competence_levels
  has_many :competences, through: :assigned_competence_levels
  
  def add_competence(competence, level)
    self.assigned_competence_levels.create(competence: competence, level: level)
  end
  
  def add_pending_competence(pending_competence, level)
    self.pending_competence_levels.create(competence: pending_competence, level: level)
  end
  
  def approve_pending_competence(pending_competence)
    
  end
end
