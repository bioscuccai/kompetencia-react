module PersonRequestFormatter
  extend ActiveSupport::Concern
  include UserFormatter
  
  def format_person_request p
    {
      id: p.id,
      target: format_user(p.target),
      target_id: p.target_id,
      starts_at: p.starts_at,
      ends_at: p.ends_at,
      title: p.title,
      comment: p.comment,
      user_id: p.user_id,
      user: format_user(p.user),
      confirmed: p.confirmed
    }
  end
end
