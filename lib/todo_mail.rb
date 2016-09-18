require 'pp'

module TodoMail
  def self.delete_pending_store
    $redis.del "notification:person_request:create"
    $redis.del "notification:person_request:update"

    $redis.keys("notification:skill:pending:*").each do |key|
      $redis.del key
    end

    $redis.keys("notification:competence:pending:*").each do |key|
      $redis.del key
    end
  end

  def self.reset_pending_for mail
    mail[:pending_subordinates].each do |u|
      $redis.del "notification:competence:pending:#{u.id}"
      $redis.del "notification:skill:pending:#{u.id}"
    end

    mail[:new_requests].each do |r|
      $redis.srem "notification:person_request:create", r.id
    end

    mail[:updated_requests].each do |r|
      $redis.srem "notification:person_request:update", r.id
    end
  end

  def self.collect_sendable freq=nil
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

    mails=[]

    godfathers=[]
    if freq.nil?
      godfathers=User.where(receive_email: true).with_role(:godfather)
    else
      godfathers=User.where(receive_email: true, mail_frequency: freq).with_role(:godfather)
    end

    godfathers.each do |gf|
      subordinate_ids=gf.subordinates.map(&:id)
      #person requests
      gf_new_requests=new_person_requests
        .where("(person_requests.updated_at > ? OR ?) AND users.godfather_id = ?", gf.last_seen_relevant, gf.last_seen_relevant.nil?, gf.id)

      gf_updated_requests=updated_person_requests
        .where("(person_requests.updated_at > ? OR person_requests.updated_at > ? OR ? OR ?) AND user_id = ?",
          gf.last_seen_relevant, gf.last_seen_requested, gf.last_seen_relevant.nil?, gf.last_seen_requested.nil?, gf.id)

      #pending competences
      pending_subordinate_ids=pending_user_ids & subordinate_ids

      #pending skills
      pending_skill_subordinate_ids=pending_skill_user_ids & subordinate_ids

      gf_requested=gf_updated_requests.select{|r| r.user_id==gf.id}
      gf_relevant_replied=gf_updated_requests.select{|r| r.target_id===gf.id}

      pending_subordinates=User.where("id IN (?)", (pending_subordinate_ids | pending_skill_subordinate_ids))

      mails.push({
        godfather: gf,
        pending_subordinates: pending_subordinates,
        updated_requests: gf_updated_requests,
        new_requests: gf_new_requests
      })
    end
    mails=mails.select do |m|
      m[:pending_subordinates].count!=0 || m[:updated_requests].count!=0 || m[:new_requests].count!=0
    end
    mails
  end

  def self.send_mail mail
    p ("sending mail for #{mail[:godfather].name}")
    TodoMailer
      .todo_mail(mail[:godfather], mail[:pending_subordinates], mail[:updated_requests], mail[:new_requests])
      .deliver_now
  end
end