class CreateSavedQueryCompetences < ActiveRecord::Migration
  def change
    create_table :saved_query_competences do |t|
      t.integer :saved_query_id, null: false
      t.integer :competence_id, null: false
      t.integer :level, null: false

      t.timestamps null: false
    end
  end
end
