class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  #before_action :set_last_activity
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  def set_last_activity
    if user_signed_in? && (params[:controller]!="users" && params[:action]!="todos")
      $redis.set "kompetencia:user:last_activity:#{current_user.id}", Time.new
    end
  end
  
  def after_sign_in_path_for(resource)
    landing_users_path
  end
  
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :last_name
    devise_parameter_sanitizer.for(:sign_up) << :first_name
    devise_parameter_sanitizer.for(:sign_up) << :godfather_id
    
    devise_parameter_sanitizer.for(:account_update) << :first_name
    devise_parameter_sanitizer.for(:account_update) << :last_name
  end
end
