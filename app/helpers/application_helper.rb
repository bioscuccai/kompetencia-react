module ApplicationHelper
  def import_bundle
    "<script type='text/javascript' src='http://localhost:8080/bundle.js'></script>".html_safe
  end
  
  def render_react_tag(tag, props={}, selector="holder")
    ("<script type='text/javascript'>\n"+
    "$(function(){"+
    "console.log('rendering');"+
    "renderTag('#{tag}', #{props.to_json}, '#{selector}');"+
    "});"+
    "</script>").html_safe
  end
end
