Rails.application.routes.draw do
  resources :availabilities, only: [:recent] do
    collection do
      get 'recent'
    end
  end
  resources :competence_tier_groups do
    collection do
      get 'all'
    end
  end
  resources :competence_types do
    collection do
      get 'all'
    end
  end
  resources :competence_tiers
  resources :competences do
    collection do
      get 'all'
    end
  end
  devise_for :users
  
  resources :users do
    resources :availabilities do
      collection do
        get 'godfather_availabilities'
      end
      member do
        post 'turn_on'
        post 'turn_off'
      end
    end
    resources :person_requests do
      collection do
        get 'relevant'
        post 'collisions'
      end
      member do
        post 'accept'
        post 'accept_no_collision'
        post 'reject'
      end
    end
    member do
      get 'assigned_competences'
      post 'add_competence'
      
      get 'pending_competences'
      post 'add_pending_competence'
      post 'accept_pending_competence'
      post 'reject_pending_competence'
      
      post 'remove_competence'
      
      get 'make_admin'
      get 'revoke_admin'
      
      get 'make_godfather'
      get 'revoke_godfather'
      
      get 'subordinates'
      
      get 'competences'
      
      post 'add_godfather'
      post 'remove_godfather'
      
    end
    collection do
      get 'landing'
      
    end
  end
  
  get 'query' => 'query#index'
  post 'query/query' => 'query#query'
  
  root 'users#home'
end
