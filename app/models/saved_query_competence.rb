class SavedQueryCompetence < ActiveRecord::Base
  belongs_to :competence
  belongs_to :saved_query
end
