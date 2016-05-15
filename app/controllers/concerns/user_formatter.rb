module UserFormatter
  extend ActiveSupport::Concern
  def format_user u, hsh={}
    wo=hsh[:without] || []
    user={
      id: u.id,
      email: u.email,
      available: u.available?,
      godfather_id: u.godfather_id,
      is_godfather: u.has_role?(:godfather),
      is_admin: u.has_role?(:admin),
      name: u.name
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
          competences: (u.assigned_competence_levels.map do |acl|
            {
              id: acl.competence_id,
              title: acl.competence.title,
              level: acl.level
            }
          end)
        }
      )
      
      if !wo.include? :pending_count
        user.merge!({
            pending_count: u.pending_competence_levels.count
          }
        )
      end
      
      if !wo.include? :skills
        user.merge!({
            skills: u.users_skills.map{|us| us.formatted}
          }
        )
      end
    end
    
    user
  end
end
