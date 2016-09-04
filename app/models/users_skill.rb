class UsersSkill < ActiveRecord::Base
  belongs_to :user
  belongs_to :skill

  after_create :add_to_skill_notifications
  before_destroy :remove_from_skill_notifications

  def formatted
    return {
      users_skill_id: self.id,
      id: self.skill_id,
      name: self.skill.name,
      user_id: self.user_id,
      confirmed: self.confirmed
    }
  end

  def add_to_skill_notifications
    $redis.sadd "notification:skill:pending:#{self.user_id}", self.id
    true
  end

  def remove_from_skill_notifications
    $redis.srem "notification:skill:pending:#{self.user_id}", self.id
    true
  end
end
