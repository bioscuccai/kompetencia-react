module UserFormatter
  extend ActiveSupport::Concern
  
  def format_user u
    {
      id: u.id,
      email: u.email,
      available: u.available?,
      competences: (u.assigned_competence_levels.map do |acl|
        {
          id: acl.competence_id,
          title: acl.competence.title,
          level: acl.level
        }
      end),
      godfather_id: u.godfather_id,
      godfather: (u.godfather.nil? ? nil : ({
        id: u.godfather.id,
        email: u.godfather.email
      }))
    }
  end
end
