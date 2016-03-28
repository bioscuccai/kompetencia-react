class AddCompetenceTierGroupIdToCompetenceType < ActiveRecord::Migration
  def change
    add_column :competence_types, :competence_tier_group_id, :integer
  end
end
