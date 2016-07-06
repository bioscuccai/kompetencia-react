class CreateSavedQueries < ActiveRecord::Migration
  def change
    create_table :saved_queries do |t|
      t.string :name, null: false, default: ''
      t.boolean :match_all, null: false, default: false

      t.timestamps null: false
    end
  end
end
