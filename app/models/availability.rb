class Availability < ActiveRecord::Base
  belongs_to :user
  
  #ha van befejezeso idopont a _lekerdezesben_
  #starts_at----lekerdezes.starts_at----lekerdezes.ends_at----ends_at
  scope :collisions_two, ->(b_starts_at, b_ends_at){where("starts_at<=:b_starts_at AND ends_at>=:b_ends_at", b_starts_at: b_starts_at, b_ends_at: b_ends_at)}
  #ha nincs befejezo idopont a _lekerdezesben_
  scope :collisions_one, ->(b_starts_at){where("", starts_at)}
  
  long_where=[
    "(starts_at<=:b_starts_at AND :b_starts_at<=ends_at)",
    "(starts_at<=:b_ends_at AND :b_ends_at<=ends_at)",
    "(:b_starts_at<=starts_at AND starts_at<=:b_ends_at)",
    "(:b_starts_at<=ends_at AND ends_at<=:b_ends_at)"
  ].join(" OR ")
  
  #scope :collision_not_strict, ->(b_starts_at, b_ends_at){where("(DATEDIFF(starts_at, ?) * DATEDIFF(?, ends_at)) >= 0", b_ends_at, b_starts_at)}
  scope :collisions_not_strict, ->(b_starts_at, b_ends_at){where(long_where, b_starts_at: b_starts_at, b_ends_at: b_ends_at)}
  
  scope :for_godfather, ->(godfather_id){joins(:user).where("users.godfather_id=?", godfather_id)}
  
  scope :active_availabilities, ->{where(active: true)}
  
  scope :recent, ->{active_availabilities.order(created_at: :desc).limit(30)}
  
  
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
