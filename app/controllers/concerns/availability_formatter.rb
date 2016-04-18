module AvailabilityFormatter
  extend ActiveSupport::Concern
  include UserFormatter
  
  def format_availability a
    {
      id: a.id,
      user_id: a.user_id,
      user: format_user(a.user, without: [:godfather, :competences]),
      #title: a.title,
      comment: a.comment,
      starts_at: a.starts_at,
      ends_at: a.ends_at,
      active: a.active
    }
  end
end
