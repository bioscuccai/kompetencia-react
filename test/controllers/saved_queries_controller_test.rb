require 'test_helper'

class SavedQueriesControllerTest < ActionController::TestCase
  setup do
    @saved_query = saved_queries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:saved_queries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create saved_query" do
    assert_difference('SavedQuery.count') do
      post :create, saved_query: { match_all: @saved_query.match_all, name: @saved_query.name }
    end

    assert_redirected_to saved_query_path(assigns(:saved_query))
  end

  test "should show saved_query" do
    get :show, id: @saved_query
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @saved_query
    assert_response :success
  end

  test "should update saved_query" do
    patch :update, id: @saved_query, saved_query: { match_all: @saved_query.match_all, name: @saved_query.name }
    assert_redirected_to saved_query_path(assigns(:saved_query))
  end

  test "should destroy saved_query" do
    assert_difference('SavedQuery.count', -1) do
      delete :destroy, id: @saved_query
    end

    assert_redirected_to saved_queries_path
  end
end
