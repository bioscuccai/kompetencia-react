class RenamePrivateToUnpublishedInSavedQuery < ActiveRecord::Migration
  def change
    rename_column :saved_queries, :private, :unpublished
  end
end
