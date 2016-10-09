class AddLastExpiredAvailabilityCheckToUser < ActiveRecord::Migration
  def change
    add_column :users, :last_expired_availability_check, :datetime
  end
end
