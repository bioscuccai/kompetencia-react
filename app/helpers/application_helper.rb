module ApplicationHelper
  include UserFormatter
  
  def import_bundle
    if Rails.env.development?
      "<script type='text/javascript' src='http://localhost:8080/bundle.js'></script>".html_safe
    else
      "<script type='text/javascript' src='/bundle.js'></script>".html_safe
    end
  end
  
  def render_react_tag(tag, props={}, selector="holder")
    ("<script type='text/javascript'>\n"+
    "$(function(){"+
    "renderTag('#{tag}', #{props.to_json}, '#{selector}');"+
    "});"+
    "</script>").html_safe
  end
  
  
  def format_user_instance u
    format_user u
  end
end
