class ReportSavedQuery < ActiveRecord::Base
  belongs_to :report
  belongs_to :saved_query
end
