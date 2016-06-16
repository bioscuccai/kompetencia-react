FactoryGirl.define do
  sequence :email do |n|
    "email#{n}@example.com"
  end
  
  sequence :competence_type do |n|
    "compence type #{n}"
  end
  
  sequence :competence do |n|
    "competence #{n}"
  end
  
  sequence :competence_tier_group do |n|
    "competence tier group #{n}"
  end
  
  sequence :competence_tier do |n|
    "competence_tier #{n}"
  end
  
  sequence :competence_tier_level do |n|
    n
  end
  
  sequence :availability do |n|
    "availabilty #{n}"
  end
  
  sequence :person_request do |n|
    "person request #{n}"
  end
  
  factory :user do
    email
    first_name 'a'
    last_name 'a'
    password 'aaaaaaaa'
    password_confirmation 'aaaaaaaa'
    
    
    after(:create) do |user|
      user.confirm
      user.save!
    end
    
    factory :admin do
      after(:create) do |user|
        user.add_role :admin
      end
    end
    
    factory :godfather do
      after(:create) do |user|
        user.add_role :godfather
      end
    end
  end
  
  factory :competence_tier_group do
    title {generate(:competence_tier_group)}
    description ''
  end
  
  factory :competence_tier do
    title {generate(:competence_tier)}
    level {generate(:competence_tier_level)}
    description ''
  end
  
  factory :competence_type do
    title {generate(:competence_type)}
    description ''
  end
  
  factory :competence do
    title {generate(:competence)}
  end
  
  factory :availability do
    comment {generate(:availability)}
    starts_at {3.days.ago}
    ends_at {Time.now}
  end
  
  factory :person_request do
    title {generate(:person_request)}
    comment ''
    chance 100
    starts_at 3.days.ago
    ends_at Time.now
  end
end
