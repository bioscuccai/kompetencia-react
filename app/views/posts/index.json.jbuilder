json.array!(@posts) do |post|
  json.extract! post, :id, :title, :short_text, :text, :published, :front_page, :important, :user_id
  json.url post_url(post, format: :json)
end
