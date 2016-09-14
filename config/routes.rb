Rails.application.routes.draw do
  resources :posts, only: [:show, :index, :create, :update, :destroy]
  resources :saved_queries
  resources :reports do
    member do
      get :results
      get :matrix
    end
  end
  resources :skills, only: [:index, :destroy]
  
  resources :availabilities, only: [:recent] do
    collection do
      get 'recent'
    end
  end
  resources :competence_tier_groups, only: [:index, :update, :create, :destroy] do
    collection do
      get 'all'
    end
  end
  resources :competence_types, only: [:index, :update, :create, :destroy] do
    collection do
      get 'all'
    end
  end
  
  resources :competence_tiers, only: [:index, :update, :create, :destroy]
  
  resources :competences, only: [:index, :update, :create, :destroy] do
    collection do
      get 'all'
    end
  end
  devise_for :users
  
  resources :users do
    resources :skills, only: [:index, :update, :create, :destroy] do
      member do
        get 'confirm'
      end
    end
    
    resources :availabilities, only: [:index, :update, :create, :destroy] do
      collection do
        get 'godfather_availabilities'
      end
      member do
        post 'turn_on'
        post 'turn_off'
      end
    end
    
    resources :person_requests, only: [:index, :update, :create, :destroy] do
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
      post 'mass_accept_pending'
      post 'mass_accept_skill'
      
      post 'remove_competence'
      
      get 'make_admin'
      get 'revoke_admin'
      
      get 'make_godfather'
      get 'revoke_godfather'
      
      get 'subordinates'
      
      get 'competences'
      
      post 'add_godfather'
      post 'remove_godfather'
      
      get 'notify_seen_by_godfather'
    end
    
    collection do
      get 'landing'
      post 'change'
      post 'upload_cv'
      
      get 'todos'
      
      get 'notify_seen_relevant'
      get 'notify_seen_requested'
      
      get 'godfathers'
      get 'stats'
      get 'docs'
    end
  end
  
  get 'query' => 'query#index'
  post 'query/query' => 'query#query'

  get 'email_dummy/collect_sendable' => 'email_dummy#collect_sendable'
  get 'email_dummy/delete_pending_store' => 'email_dummy#delete_pending_store'
  
  root 'users#landing'
end
