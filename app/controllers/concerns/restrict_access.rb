module RestrictAccess
  extend ActiveSupport::Concern
  
  def restrict_admin_godfather
    raise CanCan::AccessDenied if !current_user.has_role?(:admin) && !current_user.has_role?(:godfather)
  end
end
