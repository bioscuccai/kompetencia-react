class CompetenceTier < ActiveRecord::Base
  belongs_to :competence_tier_group
  
  before_create :assign_level
  
  def assign_level
    competence_tier_group=CompetenceTierGroup.find(self.competence_tier_group_id)
    self.level=competence_tier_group.competence_tiers.count
  end
  
  def self.tier_names
    @tier_names=all
      group_by(&:competence_tier_group_id)
    @tier_names.keys.each do |k|
      @tier_names[k]=@tier_names[k].map{|v| [v.level, v.title]}.to_h
    end
  end
end
