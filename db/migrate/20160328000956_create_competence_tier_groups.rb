class CreateCompetenceTierGroups < ActiveRecord::Migration
  def change
    create_table :competence_tier_groups do |t|
      t.string :title, null: false
      t.text :description, null: false, default: ""

      t.timestamps null: false
    end
  end
end
