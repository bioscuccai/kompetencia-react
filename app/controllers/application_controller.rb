class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  before_action :set_last_activity
  
  def set_last_activity
    if user_signed_in?
      $redis.set "kompetencia:user:last_activity:#{current_user.id}", Time.new
    end
  end
end
