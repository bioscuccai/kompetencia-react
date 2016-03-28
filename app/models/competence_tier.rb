class CompetenceTier < ActiveRecord::Base
  belongs_to :competence_tier_group
  
  before_create :assign_level
  
  def assign_level
    competence_tier_group=CompetenceTierGroup.find(self.competence_tier_group_id)
    self.level=competence_tier_group.competence_tiers.count
  end
end
