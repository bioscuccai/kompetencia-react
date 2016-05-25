class AddShowTitleToCompetenceType < ActiveRecord::Migration
  def change
    add_column :competence_types, :show_title, :boolean, default: true, null: false
  end
end
