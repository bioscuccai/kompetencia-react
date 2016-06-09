class AddDescriptionToCompetenceType < ActiveRecord::Migration
  def up
    add_column :competence_types, :description, :text, null: false
    CompetenceType.all.update_all(description: "")
  end
  
  def down
    remove_column :competence_types, :description
  end
end
