class Skill < ActiveRecord::Base
  has_many :users_skills, dependent: :destroy
  has_many :users, through: :users_skills, class_name: 'User', source: :user
end
