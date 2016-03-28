require 'test_helper'

class CompetenceTierGroupsControllerTest < ActionController::TestCase
  setup do
    @competence_tier_group = competence_tier_groups(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:competence_tier_groups)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create competence_tier_group" do
    assert_difference('CompetenceTierGroup.count') do
      post :create, competence_tier_group: { description: @competence_tier_group.description, title: @competence_tier_group.title }
    end

    assert_redirected_to competence_tier_group_path(assigns(:competence_tier_group))
  end

  test "should show competence_tier_group" do
    get :show, id: @competence_tier_group
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @competence_tier_group
    assert_response :success
  end

  test "should update competence_tier_group" do
    patch :update, id: @competence_tier_group, competence_tier_group: { description: @competence_tier_group.description, title: @competence_tier_group.title }
    assert_redirected_to competence_tier_group_path(assigns(:competence_tier_group))
  end

  test "should destroy competence_tier_group" do
    assert_difference('CompetenceTierGroup.count', -1) do
      delete :destroy, id: @competence_tier_group
    end

    assert_redirected_to competence_tier_groups_path
  end
end
