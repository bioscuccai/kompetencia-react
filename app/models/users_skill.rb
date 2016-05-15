class UsersSkill < ActiveRecord::Base
  belongs_to :user
  belongs_to :skill
  
  def formatted
    return {
      users_skill_id: self.id,
      id: self.skill_id,
      name: self.skill.name,
      user_id: self.user_id,
      confirmed: self.confirmed
    }
  end
end
