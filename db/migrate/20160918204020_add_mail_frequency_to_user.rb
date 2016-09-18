class AddMailFrequencyToUser < ActiveRecord::Migration
  def change
    add_column :users, :mail_frequency, :string, null: false, default: "1week"
  end
end
