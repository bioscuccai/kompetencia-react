class CreateCompetenceTiers < ActiveRecord::Migration
  def change
    create_table :competence_tiers do |t|
      t.string :title, null: false
      t.text :description
      t.integer :competence_tier_group_id, null: false

      t.timestamps null: false
    end
  end
end
