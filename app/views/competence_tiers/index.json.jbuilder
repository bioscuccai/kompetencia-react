json.array!(@competence_tiers) do |competence_tier|
  json.extract! competence_tier, :id, :title, :description, :competence_tier_group_id
  json.url competence_tier_url(competence_tier, format: :json)
end
