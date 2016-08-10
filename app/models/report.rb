class Report < ActiveRecord::Base
  has_many :report_saved_queries
  has_many :saved_queries, through: :report_saved_queries
  
  belongs_to :user
  
  scope :visible_for, ->(user_id){where("unpublished = ? OR user_id IS NULL OR user_id = ?", false, user_id)}
end
