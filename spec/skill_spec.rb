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
  
  it "godfather can set subordiantes' skills" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    normal_user.update!(godfather_id: godfather_user.id)
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user.id, skill_id: skill.id, confirmed: false)
    
    sign_in godfather_user
    xhr :get, :confirm, {
      user_id: normal_user.id,
      id: skill.id
    }
    user_skill=UsersSkill.find_by(user_id: normal_user.id, skill_id: skill.id)
    expect(response.status).to eq(200)
    expect(user_skill.confirmed).to eq(true)
  end
  
  it "godfather can delete subordinates' skills" do
    normal_user=create(:user)
    godfather_user=create(:godfather)
    normal_user.update!(godfather_id: godfather_user.id)
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user.id, skill_id: skill.id)
    
    sign_in godfather_user
    xhr :delete, :destroy, {
      user_id: normal_user.id,
      id: skill.id
    }
    expect(response.status).to be(200)
    expect(UsersSkill.where(user_id: normal_user.id, skill_id: skill.id).count).to be(0)
  end
end
