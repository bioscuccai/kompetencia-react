json.array!(@competences) do |competence|
  json.extract! competence, :id, :title, :competence_id
  json.url competence_url(competence, format: :json)
end
