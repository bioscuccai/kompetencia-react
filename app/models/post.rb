class Post < ActiveRecord::Base
  scope :ordered, ->{order(created_at: :desc)}
  scope :only_published, ->{where(published: true)}
  scope :only_important, ->{where(important: true)}
  scope :only_not_important, ->{where(important: false)}
  scope :only_front_page, ->{where(front_page: true)}
end
