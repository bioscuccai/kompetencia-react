json.array!(@availabilities) do |availability|
  json.extract! availability, :id, :user_id, :starts_at, :ends_at, :comment, :active
end
