class RenamePrivateToUnpublishedInReport < ActiveRecord::Migration
  def change
    rename_column :reports, :private, :unpublished
  end
end
