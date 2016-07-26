class Report < ActiveRecord::Base
  has_many :report_saved_queries
  has_many :saved_queries, through: :report_saved_queries
  
  belongs_to :user
end
