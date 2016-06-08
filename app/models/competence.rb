class Competence < ActiveRecord::Base
  belongs_to :competence_type

  
  has_many :pending_competence_levels, dependent: :delete_all
  has_many :pending_users, through: :pending_competence_levels, class_name: 'User', source: :user
  
  has_many :assigned_competence_levels, dependent: :delete_all
  has_many :users, through: :assigned_competence_levels
end
