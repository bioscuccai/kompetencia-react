json.array!(@availabilities) do |availability|
  json.extract! availability, :id, :user_id, :start, :end, :comment
  json.url availability_url(availability, format: :json)
end
