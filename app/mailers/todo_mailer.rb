class TodoMailer < ApplicationMailer
  def todo_mail(user, pending_users, requested, relevant, expired_availabilities)
    @user=user
    @pending_users=pending_users
    @requested=requested
    @relevant=relevant
    @expired_availabilities=expired_availabilities
    mail(to: user.email, subject: 'SED RM teendők')
  end
end
