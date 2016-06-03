require 'pp'

namespace :todo_mailer do
  desc "TODO"
  task process: :environment do
    User.with_role(:godfather).where(receive_email: true).each do |gf|
      pending_users=gf.notification_pending_users
      requested=gf.notification_requested
      relevant=gf.notification_relevant
      
      pending_users.each do |u|
        u.pending_competence_levels.where(notified: false).each do |pcl|
          pcl.update_column(:notified, true)
        end
      end
      
      if pending_users.count!=0 || requested.count!=0 || relevant.count!=0
        TodoMailer.todo_mail(gf, pending_users, requested, relevant).deliver_now
      end
    end
  end
end
