class CreatePersonRequests < ActiveRecord::Migration
  def change
    create_table :person_requests do |t|
      t.integer :user_id, null: false
      t.integer :target_id, null: false
      t.datetime :starts_at, null: false
      t.datetime :ends_at
      t.integer :chance, null: false, default: 100
      t.string :title, null: false, default: ""
      t.text :comment, null: false, default: ""

      t.timestamps null: false
    end
  end
end
