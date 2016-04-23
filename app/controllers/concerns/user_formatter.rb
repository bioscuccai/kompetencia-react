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
      is_admin: u.admin
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
    end
    user
  end
end
