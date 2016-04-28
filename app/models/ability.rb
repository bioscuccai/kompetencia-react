class Ability
  include CanCan::Ability
  #TODO: sok, sokminden...

  def initialize(user)
    can :manage, :all
    
    if user
      can [:index, :show], Availability
      can [:index, :show], PersonRequest
      can [:index, :show], User
      can [:query], :query
      
      if user.has_role? :godfather
        
        can :remove_godfather, User, godfather_id: user.id
        
        can :add_godfather, User, godfather_id: nil
        
        can [:accept, :accept_no_collision, :reject], PersonRequest, user_id: user.id
        
        can [:create], PersonRequest
        can [:update, :delete], PersonRequest, user_id: user.id
        
        can [:create], Availability
        can [:update, :delete], Availability
        can [:index]
      end
      
      if user.has_role? :admin
        can :manage, :all
      end
    end
  end
end
