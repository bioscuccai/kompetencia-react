class CreateUsersSkills < ActiveRecord::Migration
  def change
    create_table :users_skills do |t|
      t.integer :user_id, null: false
      t.integer :skill_id, null: false
      t.boolean :confirmed, null: false, default: false
    end
  end
end
