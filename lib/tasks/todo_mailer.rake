require 'pp'
require 'pry'

namespace :todo_mailer do
  desc "TODO"
  task process: :environment do
    new_person_request_ids=$redis.smembers "notification:person_request:create"
    updated_person_request_ids=$redis.smembers "notification:person_request:update"

    new_person_requests=PersonRequest.joins(:target).where("person_requests.id IN (?)", new_person_request_ids)
    updated_person_requests=PersonRequest.joins(:target).where("person_requests.id IN (?)", updated_person_request_ids)

    pending_user_ids=$redis
      .keys('notification:competence:pending:*')
      .map{|id| id.gsub('notification:competence:pending:', '').to_i}

    pending_skill_user_ids=$redis
      .keys('notification:skill:pending:*')
      .map{|id| id.gsub('notification:skill:pending:', '').to_i}
    
    User.where(receive_email: true).with_role(:godfather).select{|gf| gf.id==1}.each do |gf|
      subordinate_ids=gf.subordinates.map(&:id)
      
      #person requests
      gf_new_requests=new_person_requests.where("person_requests.updated_at > ? AND users.godfather_id = ?", gf.last_seen_relevant, gf.id)
      gf_updated_requests=updated_person_requests
        .where("(person_requests.updated_at > ? AND users.godfather_id = ?) OR (person_requests.updated_at > ? AND user_id = ?)",
          gf.last_seen_relevant, gf.id, gf.last_seen_requested, gf.id)

      #pending competences
      pending_subordinate_ids=pending_user_ids & subordinate_ids

      #pending skills
      pending_skill_subordinate_ids=pending_skill_user_ids & subordinate_ids

      gf_requested=gf_updated_requests.select{|r| r.user_id==gf.id}
      gf_relevant_replied=gf_updated_requests.select{|r| r.target_id===gf.id}

      pending_subordinates=User.where("id IN (?)", (pending_subordinate_ids & pending_skill_subordinate_ids))
      p '------------------'
      p gf.name
      p '------------------'
      p "skill"
      pp pending_skill_subordinate_ids
      p "subordinate"
      pp pending_subordinate_ids
      p "new request"
      pp gf_new_requests
      p "updated request"
      pp gf_updated_requests

      if pending_subordinates.count != 0 || gf_new_requests.count != 0 || gf_updated_requests.count != 0
        TodoMailer.todo_mail(gf, pending_subordinates, gf_updated_requests, gf_new_requests).deliver_now
      end

      #cleanup
      $redis.del "notification:person_request:create"
      $redis.del "notification:person_request:update"

      $redis.keys("notification:skill:pending:*").each do |key|
        $redis.del key
      end

      $redis.keys("notification:competence:pending:*").each do |key|
        $redis.del key
      end

    end
  end
end
