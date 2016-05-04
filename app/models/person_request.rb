class PersonRequest < ActiveRecord::Base
  belongs_to :user
  belongs_to :target, class_name: 'User', foreign_key: :target_id
  
  #a target user-kent van joinolva
  scope :relevant_for, ->(user_id){joins(:target).where("users.godfather_id=:user_id OR user_id=:user_id", user_id: user_id)}
end
