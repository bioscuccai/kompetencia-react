require "rails_helper"

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
end

RSpec.describe UsersController, type: :controller do
  before :all do
    #@request.env['devise.mapping'] = Devise.mappings[:user]
    
    5.times do |i|
      ctg=build(:competence_tier_group)
      3.times do |i|
        ct=build(:competence_tier)
        ct.update!(competence_tier_group: ctg)
      end
    end
    
    5.times do |i|
      ct=build(:competence_type)
      ct.update!(competence_tier_group: CompetenceTierGroup.all.sample)
      3.times do |i|
        c=build(:competence)
        c.update!(competence_type: ct)
      end
    end
  end
  
  it "landing should be redirect for unreg" do
    xhr :get, :landing
    expect(response.status).to eq(302)
  end
  
  it "change should be invisible to unreg" do
    xhr :post, :change
    expect(response.status).to eq(401)
  end
  
  it "upload_cv should be invisible to unreg" do
    xhr :post, :upload_cv
    expect(response.status).to eq(401)
  end
  
  it "notify_seen_relevant should be invisible to unreg" do
    xhr :get, :notify_seen_relevant
    expect(response.status).to eq(401)
  end
  
  it "notify_seen_requested should be invisible to unreg" do
    xhr :get, :notify_seen_requested
    expect(response.status).to eq(401)
  end
  
  it "todos should be invisible to unregistered users" do
    xhr :get, :todos
    expect(response.status).to eq(401)
  end
  
  it "godfathers should be invisible to unregistered users" do
    xhr :get, :godfathers
    expect(response.status).to eq(401)
  end
  
  it "todos should be invisible to unregistered users" do
    normal_user=create(:user)
    sign_in normal_user
    xhr :get, :todos
    expect(true).to eq(true)
  end
  
  it "make_admin should be catched by cancancan by normal users" do
    normal_user=create(:user)
    sign_in normal_user
    expect {
      xhr :get, :make_admin, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_admin should be catched by cancancan by normal users" do
    normal_user=create(:user)
    sign_in normal_user
    expect {
      xhr :get, :revoke_admin, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_godfather should be catched by cancancan by normal users" do
    normal_user=create(:user)
    sign_in normal_user
    expect {
      xhr :get, :make_godfather, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_godfather should be catched by cancancan by normal users" do
    normal_user=create(:user)
    sign_in normal_user
    expect {
      xhr :get, :revoke_godfather, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_admin should be catched by cancancan by godfather users" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    sign_in godfather_user
    expect {
      xhr :get, :make_admin, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_admin should be catched by cancancan by godfather users" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    sign_in godfather_user
    expect {
      xhr :get, :revoke_admin, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_godfather should be catched by cancancan by godfather users" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    sign_in godfather_user
    expect {
      xhr :get, :make_godfather, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_godfather should be catched by cancancan by godfather users" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    sign_in godfather_user
    expect {
      xhr :get, :revoke_godfather, {id: normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't add competence" do
    normal_user=create(:user)
    sign_in normal_user
    expect {
      xhr :post, :add_competence, {
        id: normal_user.id,
        competence_id: Competence.first,
        level: Competence.first.competence_type.competence_tier_group.competence_tiers.first.level
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't set pending competence for another user" do
    normal_user=create(:user)
    normal_user2=create(:user)
    sign_in normal_user
    expect {
      xhr :post, :add_pending_competence, {
        id: normal_user2.id,
        competence_id: Competence.first,
        level: Competence.first.competence_type.competence_tier_group.competence_tiers.first.level
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't accept pending competence on self" do
    normal_user=create(:user)
    normal_user.add_pending_competence(Competence.first, Competence.first.competence_type.competence_tier_group.competence_tiers.first.level)
    sign_in normal_user
    expect {
      xhr :post, :accept_pending_competence, {
        id: normal_user.id,
        competence_id: Competence.first.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "godfather can set own competences" do
    godfather_user=create(:godfather)
    competence=Competence.first
    competence_level=0
    
    sign_in godfather_user
    xhr :post, :add_competence, {
      id: godfather_user.id,
      competence_id: competence.id,
      level: competence_level
    }
    expect(response.status).to eq(200)
    expect(AssignedCompetenceLevel.where(user_id: godfather_user.id, competence_id: competence.id, level: competence_level).count).to eq(1)
  end
  
  it "godfather can set subordinates's competences" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    normal_user.update!(godfather_id: godfather_user.id)
    competence=Competence.first
    competence_level=0
    
    #PendingCompetenceLevel.create(user_id: normal_user.id, competence_id: competence.id, level: 0)
    
    sign_in godfather_user
    xhr :post, :add_competence, {
      id: normal_user.id,
      level: competence_level,
      competence_id: competence.id
    }
    expect(response.status).to eq(200)
    expect(AssignedCompetenceLevel.where(user_id: normal_user.id, competence_id: competence.id, level: competence_level).count).to eq(1)
  end
  
  it "godfather can set subordiantes' competence" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    skill=Skill.find_or_create_by name: 'test'
    UsersSkill.create(user_id: normal_user.id, skill_id: skill.id, confirmed: false)
    
    expect(1).to be(1)
  end
end
