class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :short_text, null: false
      t.text :text, null: false
      t.boolean :published, null: false, default: false
      t.boolean :front_page, null: false, default: false
      t.boolean :important, null: false, default: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
