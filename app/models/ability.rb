class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, :all
    
    if user
      #can :query, Query
      
      if user.has_role? :godfather
        
        can :remove_godfather, User, godfather_id: user.id
        
        can :add_godfather, User, godfather_id: nil
        
        can [:accept, :accept_no_collision, :reject], PersonRequest, user_id: user.id
      end
      
      if user.has_role? :admin
        can [:make_admin, :revoke_admin, :make_godfather, :revoke_godfather], User
      end
    end
  end
end
