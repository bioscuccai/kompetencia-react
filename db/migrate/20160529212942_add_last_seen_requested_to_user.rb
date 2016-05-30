class AddLastSeenRequestedToUser < ActiveRecord::Migration
  def change
    add_column :users, :last_seen_requested, :datetime
  end
end
