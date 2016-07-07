class SavedQuery < ActiveRecord::Base
  has_many :saved_query_competences
  has_many :competences, through: :saved_query_competences
  
  has_many :report_saved_queries, dependent: :destroy
  has_many :reports, through: :report_saved_queries
end
