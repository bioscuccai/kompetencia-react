class AddLevelToCompetenceTier < ActiveRecord::Migration
  def change
    add_column :competence_tiers, :level, :integer, null: false, default: 0
  end
end
