class Ability
  include CanCan::Ability
  #TODO: sok, sokminden...

  def initialize(user)
    #can :manage, :all
    
    if user
      if user.has_role? :admin
        can :manage, :all
      end
      
      can [:index, :show], User
      
      can [:update, :destroy, :turn_on, :turn_off], Availability do |availability|
        user.has_authority_over?(availability.user)
      end
      
      can [:remove_godfather, :add_competence, :accept_pending_competence,
        :reject_pending_competence, :remove_competence, :remove_pending_competence], User do |u|
        user.has_authority_over?(u)
      end
      
      can [:add_pending_competence, :remove_competence, :remove_pending_competence], User do |u|
        user==u
      end
      
      can :add_godfather, User do |u|
        user.has_role?(:admin) || (user.has_role?(:godfather) && u.godfather_id.nil?)
      end
      
      can [:make_admin, :revoke_admin, :make_godfather, :revoke_godfather], User do |u|
        user.has_role?(:admin)
      end
      
      
      can [:accept, :accept_no_collision, :reject], PersonRequest do |pr|
        pr.target && user.has_authority_over?(pr.target)
      end
      can [:update, :destroy], PersonRequest, user_id: user.id
      can [:create], PersonRequest if user.has_role?(:admin) || user.has_role?(:godfather)
    end
  end
end
