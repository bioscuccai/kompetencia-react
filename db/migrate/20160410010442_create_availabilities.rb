class CreateAvailabilities < ActiveRecord::Migration
  def change
    create_table :availabilities do |t|
      t.integer :user_id, null: false
      t.datetime :starts_at, null: false
      t.datetime :ends_at #ez lehet null, ha nem tudjuk meddig tart az uborkaszezon
      t.text :comment

      t.timestamps null: false
    end
  end
end
