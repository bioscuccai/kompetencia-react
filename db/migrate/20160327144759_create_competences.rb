class CreateCompetences < ActiveRecord::Migration
  def change
    create_table :competences do |t|
      t.string :title, null: false
      t.integer :competence_type_id

      t.timestamps null: false
    end
  end
end
