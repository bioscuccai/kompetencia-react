json.array!(@competence_types) do |competence_type|
  json.extract! competence_type, :id, :title
  json.url competence_type_url(competence_type, format: :json)
end
