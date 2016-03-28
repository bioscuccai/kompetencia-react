class CompetenceType < ActiveRecord::Base
  has_many :competences
  belongs_to :competence_tier_group
end
