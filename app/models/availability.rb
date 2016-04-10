class Availability < ActiveRecord::Base
  belongs_to :user
  
  def current?
    if self.ends_at.nil? && self.starts_at<Time.now
      return true
    end
    if self.starts_at<Time.now && self.ends_at>Time.now
      return true
    end
    false
  end
end
