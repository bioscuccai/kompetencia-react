class QueryController < ApplicationController
  include UserFormatter
  skip_before_filter :verify_authenticity_token
  authorize_resource class: false
  
  def index
    
  end
  
  def query
    result_per_user=Hash.new{|h,k| h[k]=[]}
    users=[]
    params[:competences].each do |c|
      res=User.includes(:godfather, assigned_competence_levels: [:competence]).has_level(c["competence_id"], c["level"])
      #res_with_date = (params[:check_date]=="1") ? res.select{|u| u.availabilities_between(Time.new(params[:starts_at]), Time.new(params[:ends_at])).count!=0} : res
      users.push res
      res.each do |u|
        (result_per_user[u.id]).push c["competence_id"]
      end
    end
    users=users.flatten.uniq
    user_results=users.map do |u|
      format_user(u).merge({
        found: result_per_user[u.id].map do |r|
          {
            competence_id: r,
            title: u.assigned_competence_levels.where(competence_id: r)&.first&.competence&.title,
            level: u.assigned_competence_levels.where(competence_id: r)&.first&.level,
            wanted: params[:competences].select{|c| c["competence_id"]==r}&.first&.fetch("level")
          }
        end
      })
    end
    render json: user_results
  end
end
