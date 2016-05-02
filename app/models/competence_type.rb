class CompetenceType < ActiveRecord::Base
  has_many :competences, dependent: :delete_all
  belongs_to :competence_tier_group
end
