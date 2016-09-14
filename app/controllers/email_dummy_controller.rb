class EmailDummyController < ApplicationController
  include RestrictAccess
  before_action :authenticate_user!
  before_action :restrict_admin
  
  skip_before_filter :verify_authenticity_token


  def delete_pending_store
    $redis.del "notification:person_request:create"
    $redis.del "notification:person_request:update"

    $redis.keys("notification:skill:pending:*").each do |key|
      $redis.del key
    end

    $redis.keys("notification:competence:pending:*").each do |key|
      $redis.del key
    end

    return render json: {status: :ok}    
  end

  def collect_sendable
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
    User.with_role(:godfather).each do |gf|
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

      pending_subordinates=User.where("id IN (?)", (pending_subordinate_ids | pending_skill_subordinate_ids))

      mails.push({
        godfather_name: gf.name,
        pending_subordinates: pending_subordinates.map(&:name),
        updated_requests: gf_updated_requests.map(&:title),
        new_requests: gf_new_requests.map(&:title)
      })
    end
    #mails=mail.
    render json: {status: :ok, mails: mails}
  end

end
