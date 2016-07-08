class AddShowPendingToSavedQuery < ActiveRecord::Migration
  def change
    add_column :saved_queries, :show_pending, :boolean, null: :false, default: false
  end
end
