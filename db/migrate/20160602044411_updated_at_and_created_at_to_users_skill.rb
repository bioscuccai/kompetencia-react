class UpdatedAtAndCreatedAtToUsersSkill < ActiveRecord::Migration
  def change
    add_column(:users_skills, :created_at, :datetime)
    add_column(:users_skills, :updated_at, :datetime)
  end
end
