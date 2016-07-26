class AddPrivateAndUserIdToSavedQuery < ActiveRecord::Migration
  def change
    add_column :saved_queries, :private, :boolean, null: false, default: false
    add_column :saved_queries, :user_id, :integer
  end
end
