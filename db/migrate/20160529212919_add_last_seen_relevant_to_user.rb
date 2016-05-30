class AddLastSeenRelevantToUser < ActiveRecord::Migration
  def change
    add_column :users, :last_seen_relevant, :datetime
  end
end
