class PendingCompetenceLevel < ActiveRecord::Base
  belongs_to :user
  belongs_to :competence

  after_create :add_to_competence_notifications
  before_destroy :remove_from_competence_notifications

  def add_to_competence_notifications
    $redis.sadd "notification:competence:pending:#{self.user_id}", self.id
    true
  end

  def remove_from_competence_notifications
    $redis.srem "notification:competence:pending:#{self.user_id}", self.id
    true
  end
end
