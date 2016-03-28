class CompetenceTierGroup < ActiveRecord::Base
  has_many :competence_tiers
  has_many :competence_types
end
