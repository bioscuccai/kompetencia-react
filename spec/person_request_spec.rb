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
  
  it "godfather can create person requests" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    
    sign_in godfather_user
    xhr :post, :create, {
      user_id: godfather_user.id,
      person_request: {
        title: 'test',
        starts_at: 3.days.ago,
        ends_at: Time.now,
        target_id: normal_user.id,
        chance: 100
      }
    }
    expect(response.status).to eq(200)
    expect(PersonRequest.where(target_id: normal_user.id, user_id: godfather_user.id, title: 'test').count).to eq(1)
  end
  
  it "godfather can edit own request" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    person_request=PersonRequest.create(
      title: 'test',
      starts_at: 3.days.ago,
      ends_at: Time.now,
      chance: 100,
      target_id: normal_user.id,
      user_id: godfather_user.id
    )
    
    sign_in godfather_user
    xhr :put, :update, {
      user_id: godfather_user.id,
      id: person_request.id,
      person_request: {
        title: 'modified'
      }
    }
    
    person_request.reload
    expect(response.status).to eq(200)
    expect(person_request.title).to eq('modified')
  end
  
  it "godfather can delete own requests" do
    godfather_user=create(:godfather)
    normal_user=create(:user)
    person_request=PersonRequest.create(
      title: 'test',
      starts_at: 3.days.ago,
      ends_at: Time.now,
      chance: 100,
      target_id: normal_user.id,
      user_id: godfather_user.id
    )
    
    sign_in godfather_user
    xhr :put, :destroy, {
      user_id: godfather_user.id,
      id: person_request.id
    }
    
    expect(response.status).to eq(200)
    expect(PersonRequest.where(user_id: godfather_user.id, target_id: normal_user.id).count).to eq(0)
  end
  
  it "godfather can accept/reject requests directed at him" do
    godfather_user=create(:godfather)
    godfather_target_user=create(:godfather)
    target_user=create(:user)
    target_user.update!(godfather_id: godfather_target_user.id)
    person_request=PersonRequest.create(
      title: 'test',
      starts_at: 3.days.ago,
      ends_at: Time.now,
      chance: 100,
      target_id: target_user.id,
      user_id: godfather_user.id,
      confirmed: false
    )
    
    sign_in godfather_target_user
    xhr :post, :accept, {
      id: person_request.id,
      user_id: godfather_target_user.id
    }
    person_request.reload
    expect(response.status).to eq(200)
    expect(person_request.confirmed).to eq(true)
    
    xhr :post, :reject, {
      id: person_request.id,
      user_id: godfather_target_user.id
    }
    person_request.reload
    expect(response.status).to eq(200)
    expect(person_request.confirmed).to eq(false)
    
    xhr :post, :accept_no_collision, {
      id: person_request.id,
      user_id: godfather_target_user.id
    }
    person_request.reload
    expect(response.status).to eq(200)
    expect(person_request.confirmed).to eq(true)
  end
end
