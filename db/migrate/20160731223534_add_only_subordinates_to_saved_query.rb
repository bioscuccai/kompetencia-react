class AddOnlySubordinatesToSavedQuery < ActiveRecord::Migration
  def change
    add_column :saved_queries, :only_subordinates, :boolean, null: false, default: false
  end
end
