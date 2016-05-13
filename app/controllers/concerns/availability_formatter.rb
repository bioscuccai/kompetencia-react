module AvailabilityFormatter
  extend ActiveSupport::Concern
  include UserFormatter
  
  def format_availability a, hsh={}
    ignore_from_user=hsh[:ignore_from_user] || []
    {
      id: a.id,
      user_id: a.user_id,
      user: format_user(a.user, without: ignore_from_user),
      #title: a.title,
      comment: a.comment,
      starts_at: a.starts_at,
      ends_at: a.ends_at,
      active: a.active,
      work_hours: a.work_hours
    }
  end
end
