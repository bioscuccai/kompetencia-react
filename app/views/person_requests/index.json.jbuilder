json.array!(@person_requests) do |person_request|
  json.extract! person_request, :id, :user_id, :target_id, :starts_at, :ends_at, :chance, :title, :comment
end
