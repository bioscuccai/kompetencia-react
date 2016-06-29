class AddChanceToAvailability < ActiveRecord::Migration
  def change
    add_column :availabilities, :chance, :integer, null: false, default: 100
  end
end
