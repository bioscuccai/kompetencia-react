class SavedQuery < ActiveRecord::Base
  has_many :saved_query_competences
  has_many :competences, through: :saved_query_competences
end
