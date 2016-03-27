require 'test_helper'

class CompetenceTypesControllerTest < ActionController::TestCase
  setup do
    @competence_type = competence_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:competence_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create competence_type" do
    assert_difference('CompetenceType.count') do
      post :create, competence_type: { title: @competence_type.title }
    end

    assert_redirected_to competence_type_path(assigns(:competence_type))
  end

  test "should show competence_type" do
    get :show, id: @competence_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @competence_type
    assert_response :success
  end

  test "should update competence_type" do
    patch :update, id: @competence_type, competence_type: { title: @competence_type.title }
    assert_redirected_to competence_type_path(assigns(:competence_type))
  end

  test "should destroy competence_type" do
    assert_difference('CompetenceType.count', -1) do
      delete :destroy, id: @competence_type
    end

    assert_redirected_to competence_types_path
  end
end
