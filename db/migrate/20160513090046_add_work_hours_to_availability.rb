class AddWorkHoursToAvailability < ActiveRecord::Migration
  def change
    add_column :availabilities, :work_hours, :integer
  end
end
