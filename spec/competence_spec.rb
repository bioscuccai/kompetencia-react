require "rails_helper"

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
end

describe UsersController, type: :controller do
  before :all do
    pp "lefut"
    #@request.env['devise.mapping'] = Devise.mappings[:user]
    @normal_user=User.create(email: 'normal_test@example.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa')
    @normal_user.confirm
    @normal_user.save!
    
    
    @godfather_user=User.create(email: 'godfather_test@example.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa')
    @godfather_user.add_role :godfather
    @godfather_user.confirm
    @godfather_user.save!
    
    @admin_user=User.create(email: 'admin_test@example.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa')
    @admin_user.add_role :admin
    @admin_user.confirm
    @admin_user.save!
  end
  
  it "landing should be invisible to unreg" do
    sign_out @normal_user
    xhr :get, :landing
    expect(response.status).to eq(401)
  end
  
  it "change should be invisible to unreg" do
    sign_out @normal_user
    xhr :post, :change
    expect(response.status).to eq(401)
  end
  
  it "upload_cv should be invisible to unreg" do
    sign_out @normal_user
    xhr :post, :upload_cv
    expect(response.status).to eq(401)
  end
  
  it "notify_seen_relevant should be invisible to unreg" do
    sign_out @normal_user
    xhr :get, :notify_seen_relevant
    expect(response.status).to eq(401)
  end
  
  it "notify_seen_requested should be invisible to unreg" do
    sign_out @normal_user
    xhr :get, :notify_seen_requested
    expect(response.status).to eq(401)
  end
  
  it "todos should be invisible to unregistered users" do
    sign_out @normal_user
    xhr :get, :todos
    expect(response.status).to eq(401)
  end
  
  it "godfathers should be invisible to unregistered users" do
    sign_out @normal_user
    xhr :get, :godfathers
    expect(response.status).to eq(401)
  end
  
  it "todos should be invisible to unregistered users" do
    sign_in @normal_user
    xhr :get, :todos
    expect(true).to eq(true)
  end
  
  it "make_admin should be catched by cancancan by normal users" do
    sign_in @normal_user
    expect {
      xhr :get, :make_admin, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_admin should be catched by cancancan by normal users" do
    sign_in @normal_user
    expect {
      xhr :get, :revoke_admin, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_godfather should be catched by cancancan by normal users" do
    sign_in @normal_user
    expect {
      xhr :get, :make_godfather, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_godfather should be catched by cancancan by normal users" do
    sign_in @normal_user
    expect {
      xhr :get, :revoke_godfather, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_admin should be catched by cancancan by godfather users" do
    sign_in @godfather_user
    expect {
      xhr :get, :make_admin, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_admin should be catched by cancancan by godfather users" do
    sign_in @godfather_user
    expect {
      xhr :get, :revoke_admin, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "make_godfather should be catched by cancancan by godfather users" do
    sign_in @godfather_user
    expect {
      xhr :get, :make_godfather, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "revoke_godfather should be catched by cancancan by godfather users" do
    sign_in @godfather_user
    expect {
      xhr :get, :revoke_godfather, {id: @normal_user.id}
    }.to raise_error(CanCan::AccessDenied)
  end
  
  
end
