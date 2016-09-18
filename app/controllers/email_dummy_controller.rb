require "#{Rails.root}/lib/todo_mail"

class EmailDummyController < ApplicationController
  include RestrictAccess
  before_action :authenticate_user!
  before_action :restrict_admin
  
  skip_before_filter :verify_authenticity_token


  def delete_pending_store
    TodoMail.delete_pending_store
    render json: {status: :ok}    
  end

  def collect_sendable
    mails=TodoMail.collect_sendable
    formatted_mails=mails.map do |m|
      {
        godfather_name: m[:godfather].name,
        pending_subordinates: m[:pending_subordinates].map(&:name),
        updated_requests: m[:updated_requests].map(&:title),
        new_requests: m[:new_requests].map(&:title)
      }
    end
    render json: {status: :ok, mails: formatted_mails}
  end

  def disable_mail
    $redis.del "mail:enabled"
    render json: {status: :ok}
  end

  def enable_mail
    $redis.set "mail:enabled", 1
    render json: {status: :ok}
  end

  def mail_status
    status={
      mail_enabled: $redis.exists("mail:enabled")
    }
    render json: status
  end
end
