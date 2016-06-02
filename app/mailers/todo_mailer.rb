class TodoMailer < ApplicationMailer
  def todo_mail(user, pending_users, requested, relevant)
    @user=user
    @pending_users=pending_users
    @requested=requested
    @relevant=relevant
    mail(to: user.email, subject: 'SED RM teendők')
  end
end
