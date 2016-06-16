require "rails_helper"

RSpec.configure do |config|
  config.include Devise::TestHelpers, :type => :controller
end

RSpec.describe AvailabilitiesController, type: :controller do
  it "normal user cannot create availability for other users" do
    normal_user=create(:user)
    normal_user2=create(:user)
    sign_in normal_user
    expect {
      xhr :post, :create, {
        user_id: normal_user2.id,
        availablity: {
          title: 'test',
          starts_at: 3.days.ago,
          ends_at: Time.now
        }
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user cannot modify availability for other users" do
    normal_user=create(:user)
    normal_user2=create(:user)
    
    availability=create(:availability, user_id: normal_user2.id)
    
    sign_in normal_user
    expect{
      xhr :put, :update, {
        id: availability.id,
        user_id: normal_user2.id,
        availability: {
          comment: 'modified title'
        }
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't delete other user's availability" do
    normal_user=create(:user)
    normal_user2=create(:user)
    
    availablity=create(:availability, user_id: normal_user2.id)
    
    sign_in normal_user
    expect{
      xhr :delete, :destroy, {
        id: availablity.id,
        user_id: normal_user2.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
  
  it "normal user can't turn on/off other user's availability" do
    normal_user=create(:user)
    normal_user2=create(:user)
    
    availability=create(:availability, user_id: normal_user2.id)
    
    sign_in normal_user
    expect{
      xhr :post, :turn_on, {
        id: availability.id,
        user_id: normal_user2.id
      }
    }.to raise_error(CanCan::AccessDenied)
    
    expect{
      xhr :post, :turn_off, {
        id: availability.id,
        user_id: normal_user2.id
      }
    }.to raise_error(CanCan::AccessDenied)
  end
end