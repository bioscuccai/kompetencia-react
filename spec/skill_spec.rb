require "rails_helper"

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
end

RSpec.describe SkillsController, type: :controller do
  it "normal user can't add skill for other user" do
    normal_user=create(:user)
    normal_user2=create(:user)
    sign_in normal_user
    expect {
      xhr :post, :create, {
        user_id: normal_user2.id,
        skill: {
          name: 'skill name'
        }
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't confirm own skill" do
    normal_user=create(:user)
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user.id, skill_id: skill.id)
    sign_in normal_user
    expect{
      xhr :post, :confirm, {
        user_id: normal_user.id,
        id: skill.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't confirm other's skill" do
    normal_user=create(:user)
    normal_user2=create(:user)
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user2.id, skill_id: skill.id)
    
    sign_in normal_user
    expect {
      xhr :post, :confirm, {
        user_id: normal_user2.id,
        id: skill.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't remove other's skill" do
    normal_user=create(:user)
    normal_user2=create(:user)
    
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user2.id, skill_id: skill.id)
    
    sign_in normal_user
    expect {
      xhr :delete, :destroy, {
        user_id: normal_user2.id,
        id: skill.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't remove skill globally" do
    normal_user=create(:user)
    sign_in normal_user
    
    skill=Skill.find_or_create_by name: 'test'
    
    expect {
      xhr :delete, :destroy, {
        id: skill.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
end
