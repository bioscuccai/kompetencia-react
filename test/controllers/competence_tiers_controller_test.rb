require 'test_helper'

class CompetenceTiersControllerTest < ActionController::TestCase
  setup do
    @competence_tier = competence_tiers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:competence_tiers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create competence_tier" do
    assert_difference('CompetenceTier.count') do
      post :create, competence_tier: { competence_tier_group_id: @competence_tier.competence_tier_group_id, description: @competence_tier.description, title: @competence_tier.title }
    end

    assert_redirected_to competence_tier_path(assigns(:competence_tier))
  end

  test "should show competence_tier" do
    get :show, id: @competence_tier
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @competence_tier
    assert_response :success
  end

  test "should update competence_tier" do
    patch :update, id: @competence_tier, competence_tier: { competence_tier_group_id: @competence_tier.competence_tier_group_id, description: @competence_tier.description, title: @competence_tier.title }
    assert_redirected_to competence_tier_path(assigns(:competence_tier))
  end

  test "should destroy competence_tier" do
    assert_difference('CompetenceTier.count', -1) do
      delete :destroy, id: @competence_tier
    end

    assert_redirected_to competence_tiers_path
  end
end
