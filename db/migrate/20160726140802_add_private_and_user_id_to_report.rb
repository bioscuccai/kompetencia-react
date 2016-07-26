class AddPrivateAndUserIdToReport < ActiveRecord::Migration
  def change
    add_column :reports, :private, :boolean, null: false, default: false
    add_column :reports, :user_id, :integer
  end
end
