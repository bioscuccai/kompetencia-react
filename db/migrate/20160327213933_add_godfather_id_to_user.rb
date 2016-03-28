class AddGodfatherIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :godfather_id, :integer
  end
end
