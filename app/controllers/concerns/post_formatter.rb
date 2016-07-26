module PostFormatter
  extend ActiveSupport::Concern
  include UserFormatter
  
  def format_post post
    {
      id: post.id,
      title: post.title,
      short_text: post.short_text,
      text: post.text,
      published: post.published,
      important: post.important,
      front_page: post.front_page,
      created_at: post.created_at
    }
  end
end
