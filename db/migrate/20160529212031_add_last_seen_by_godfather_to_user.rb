class AddLastSeenByGodfatherToUser < ActiveRecord::Migration
  def change
    add_column :users, :last_seen_by_godfather, :datetime
  end
end
