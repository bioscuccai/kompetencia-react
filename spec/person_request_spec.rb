require "rails_helper"

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
end

RSpec.describe PersonRequestsController, type: :controller do
  it "normal user can't create requests" do
    normal_user=create(:user)
    normal_user2=create(:user)
    
    sign_in normal_user
    expect {
      xhr :post, :create, {
        user_id: normal_user.id,
        person_request: {
          target_id: normal_user2.id,
          starts_at: 3.days.ago,
          ends_at: Time.now,
          title: 'test',
          comment: '',
          chance: 100
        }
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't accept/reject arbitrary requests" do
    normal_user=create(:user)
    godfather=create(:godfather)
    target=create(:user, godfather_id: godfather.id)
    
    person_request=create(:person_request, target_id: target.id, user_id: godfather.id)
    
    sign_in normal_user
    expect{
      xhr :post, :accept, {
        id: person_request.id,
        user_id: godfather.id
      }
    }.to raise_error(CanCan::AccessDenied)

    expect{
      xhr :post, :accept_no_collision, {
        id: person_request.id,
        user_id: godfather.id
      }
    }.to raise_error(CanCan::AccessDenied)

    expect{
      xhr :post, :reject, {
        id: person_request.id,
        user_id: godfather.id
      }
    }.to raise_error(CanCan::AccessDenied)

  end
  
  it "normal user can't delete other user's request" do
    normal_user=create(:user)
    godfather=create(:godfather)
    target=create(:user, godfather_id: godfather.id)
    
    person_request=create(:person_request, target_id: target.id, user_id: godfather.id)
    
    sign_in normal_user
    expect{
      xhr :delete, :destroy, {
        id: person_request.id,
        user_id: godfather.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't update other user's request" do
    normal_user=create(:user)
    godfather=create(:godfather)
    target=create(:user, godfather_id: godfather.id)
    
    person_request=create(:person_request, target_id: target.id, user_id: godfather.id)
    
    sign_in normal_user
    expect {
      xhr :put, :update, {
        id: person_request.id,
        user_id: godfather.id,
        person_request: {
          title: 'test - edited'
        }
      }
    }.to raise_error(CanCan::AccessDenied)
  end
end
