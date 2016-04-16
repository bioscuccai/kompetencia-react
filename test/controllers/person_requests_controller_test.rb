require 'test_helper'

class PersonRequestsControllerTest < ActionController::TestCase
  setup do
    @person_request = person_requests(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:person_requests)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create person_request" do
    assert_difference('PersonRequest.count') do
      post :create, person_request: { chance: @person_request.chance, comment: @person_request.comment, ends_at: @person_request.ends_at, starts_at: @person_request.starts_at, target_id: @person_request.target_id, title: @person_request.title, user_id: @person_request.user_id }
    end

    assert_redirected_to person_request_path(assigns(:person_request))
  end

  test "should show person_request" do
    get :show, id: @person_request
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @person_request
    assert_response :success
  end

  test "should update person_request" do
    patch :update, id: @person_request, person_request: { chance: @person_request.chance, comment: @person_request.comment, ends_at: @person_request.ends_at, starts_at: @person_request.starts_at, target_id: @person_request.target_id, title: @person_request.title, user_id: @person_request.user_id }
    assert_redirected_to person_request_path(assigns(:person_request))
  end

  test "should destroy person_request" do
    assert_difference('PersonRequest.count', -1) do
      delete :destroy, id: @person_request
    end

    assert_redirected_to person_requests_path
  end
end
