module UserFormatter
  extend ActiveSupport::Concern
  include CompetenceFormatter
  def format_user u, hsh={}
    wo=hsh[:without] || []
    level_names=hsh[:level_names] || CompetenceTier.tier_names
    user={
      id: u.id,
      email: u.email,
      #available: u.available?,
      available: u.availabilities.select{|a| a.current?}.count!=0,
      godfather_id: u.godfather_id,
      godfather_name: u&.godfather&.name,
      is_godfather: u.has_cached_role?(:godfather),
      is_admin: u.has_cached_role?(:admin),
      name: u.name,
      first_name: u.first_name,
      last_name: u.last_name,
      cv: u.cv.exists? ? u.cv.url : nil,
      last_change: [
        u.users_skills.sort_by(&:updated_at).reverse.first&.updated_at,
        u.assigned_competence_levels.sort_by(&:updated_at).reverse.first&.updated_at,
        u.pending_competence_levels.sort_by(&:updated_at).reverse.first&.updated_at
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
          competences: format_competence_list(u.assigned_competence_levels, level_names)
          #competences: []
        }
      )
    end
    
    if !wo.include? :pending_competences
      user.merge!(
        {
          pending_competences: format_competence_list(u.pending_competence_levels, level_names)
          #pending_competences: []
        }
      )
    end
    
    if !wo.include? :pending_count
      user.merge!({
          pending_count: u.pending_competence_levels.to_a.count + u.users_skills.to_a.select{|us| !us.confirmed}.count
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
