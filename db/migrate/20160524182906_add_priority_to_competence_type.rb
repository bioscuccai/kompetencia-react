class AddPriorityToCompetenceType < ActiveRecord::Migration
  def change
    add_column :competence_types, :priority, :integer, default: 0
  end
end
