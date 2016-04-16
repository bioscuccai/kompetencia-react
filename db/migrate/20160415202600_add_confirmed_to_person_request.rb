class AddConfirmedToPersonRequest < ActiveRecord::Migration
  def change
    add_column :person_requests, :confirmed, :boolean
  end
end
