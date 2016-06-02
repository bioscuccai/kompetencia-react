class AddReceiveEmailToUser < ActiveRecord::Migration
  def change
    add_column :users, :receive_email, :boolean, null: false, default: true
  end
end
