class AddActiveToAvailability < ActiveRecord::Migration
  def change
    add_column :availabilities, :active, :boolean, null: false, default: true
  end
end
