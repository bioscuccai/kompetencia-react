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
  
  it "godfather can create availabilities for subordinates" do
    normal_user=create(:user)
    godfather_user=create(:godfather)
    normal_user.update!(godfather_id: godfather_user.id)
    
    sign_in godfather_user
    xhr :post, :create, {
      user_id: normal_user.id,
      availability: {
        comment: 'title',
        starts_at: 3.days.ago,
        ends_at: Time.now,
        chance: 100
      }
    }
    expect(response.status).to be(200)
    expect(1).to be(1)
  end
  
  it "godfather can delete subordinates' availabilties" do
    normal_user=create(:user)
    godfather_user=create(:godfather)
    normal_user.update!(godfather_id: godfather_user.id)
    availability=Availability.create({
      user_id: normal_user.id,
      starts_at: 3.days.ago,
      ends_at: Time.now,
      comment: 'title'
    })
    
    sign_in godfather_user
    xhr :delete, :destroy, {
      user_id: normal_user.id,
      id: availability.id
    }
    
    expect(response.status).to be(200)
    expect(Availability.find_by(id: availability.id)).to be(nil)
  end
  
  it "godfather can edit subordinates' availabilties" do
    normal_user=create(:user)
    godfather_user=create(:godfather)
    normal_user.update!(godfather_id: godfather_user.id)
    availability=Availability.create(
      user_id: normal_user.id,
      comment: 'title',
      starts_at: 3.days.ago,
      ends_at: Time.now
    )
    
    sign_in godfather_user
    xhr :put, :update, {
      user_id: normal_user.id,
      id: availability.id,
      availability: {
        comment: 'modified'
      }
    }
    
    availability.reload
    expect(response.status).to be(200)
    expect(availability.comment).to eq('modified')
  end
  
  it "godfather can toggle subordinates' availabilities" do
    normal_user=create(:user)
    godfather_user=create(:godfather)
    normal_user.update!(godfather_id: godfather_user.id)
    availability=Availability.create(
      user_id: normal_user.id,
      comment: 'title',
      starts_at: 3.days.ago,
      ends_at: Time.now,
      active: false
    )
    
    sign_in godfather_user
    xhr :post, :turn_on, {
      user_id: normal_user.id,
      id: availability.id
    }
    expect(response.status).to be(200)
    
    availability.reload
    expect(availability.active).to eq(true)
    
    xhr :post, :turn_off, {
      user_id: normal_user.id,
      id: availability.id
    }
    availability.reload
    expect(response.status).to eq(200)
    expect(availability.active).to eq(false)
  end
end