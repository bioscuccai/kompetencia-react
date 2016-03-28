class CreatePendingCompetenceLevels < ActiveRecord::Migration
  def change
    create_table :pending_competence_levels do |t|
      t.integer :competence_id
      t.integer :user_id
      t.integer :level

      t.timestamps null: false
    end
  end
end
