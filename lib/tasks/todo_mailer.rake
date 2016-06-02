namespace :todo_mailer do
  desc "TODO"
  task process: :environment do
    User.with_role(:godfather).each do |gf|
      
    end
  end

end
