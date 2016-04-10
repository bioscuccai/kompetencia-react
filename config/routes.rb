Rails.application.routes.draw do
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
    resources :availabilities
    member do
      get 'competences'
      post 'add_competence'
      
      get 'pending_competences'
      post 'add_pending_competence'
      post 'accept_pending_competence'
      post 'reject_pending_competence'
      
      post 'remove_competence'
      
      get 'add_admin'
      get 'remove_admin'
    end
  end
  
  get 'query' => 'query#index'
  post 'query/query' => 'query#query'
  
  root 'users#home'
end
