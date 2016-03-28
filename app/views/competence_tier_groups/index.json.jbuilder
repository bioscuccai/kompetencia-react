json.array!(@competence_tier_groups) do |competence_tier_group|
  json.extract! competence_tier_group, :id, :title, :description
  json.url competence_tier_group_url(competence_tier_group, format: :json)
end
