module UserFormatter
  extend ActiveSupport::Concern
  include CompetenceFormatter
  def format_user u, hsh={}
    wo=hsh[:without] || []
    user={
      id: u.id,
      email: u.email,
      available: u.available?,
      godfather_id: u.godfather_id,
      is_godfather: u.has_role?(:godfather),
      is_admin: u.has_role?(:admin),
      name: u.name,
      first_name: u.first_name,
      last_name: u.last_name,
      cv: u.cv.exists? ? u.cv.url : nil,
      last_change: [
        u.users_skills.order(updated_at: :desc).first&.updated_at,
        u.assigned_competence_levels.order(updated_at: :desc).first&.updated_at,
        u.pending_competence_levels.order(updated_at: :desc).first&.updated_at
      ].compact.max,
      receive_email: u.receive_email
    }
    
    if !wo.include? :godfather
      user.merge!({
          godfather: (u.godfather.nil? ? nil : ({
            id: u.godfather.id,
            email: u.godfather.email
            }))
          }
      )
    end
    
    if !wo.include? :competences
      user.merge!(
        {
          competences: format_competence_list(u.assigned_competence_levels)
        }
      )
    end
    
    if !wo.include? :pending_competences
      user.merge!(
        {
          pending_competences: format_competence_list(u.pending_competence_levels)
        }
      )
    end
    
    if !wo.include? :pending_count
      user.merge!({
          pending_count: u.pending_competence_levels.count + u.users_skills.where(confirmed: false).count
        }
      )
    end
    
    if !wo.include? :skills
      user.merge!({
          skills: u.users_skills.map{|us| us.formatted}
        }
      )
    end
    
    user
  end
end
