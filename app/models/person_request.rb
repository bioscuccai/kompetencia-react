class PersonRequest < ActiveRecord::Base
  attr_accessor :trigger_notification_mail
  belongs_to :user
  belongs_to :target, class_name: 'User', foreign_key: :target_id
  after_save :add_to_update_notification_list
  after_create :add_to_create_notification_list
  
  #a target user-kent van joinolva
  scope :relevant_for, ->(user_id){joins(:target).where("users.godfather_id=:user_id OR user_id=:user_id", user_id: user_id)}

  def add_to_update_notification_list
    if self.trigger_notification_mail
      $redis.sadd 'notification:person_request:update', self.id
    end
  end

  def add_to_create_notification_list
    $redis.sadd 'notification:person_request:create', self.id
  end
end
