class AddMailForExpiredAvailabilitiesToUser < ActiveRecord::Migration
  def change
    add_column :users, :mail_for_expired_availabilities, :boolean, default: false, null: false
  end
end
