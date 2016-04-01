class CreateCompetenceTypes < ActiveRecord::Migration
  def change
    create_table :competence_types do |t|
      t.string :title, null: false


      t.timestamps null: false
    end
  end
end
