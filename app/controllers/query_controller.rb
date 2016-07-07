class QueryController < ApplicationController
  before_action :authenticate_user!
  
  include UserFormatter
  include AvailabilityFormatter
  
  skip_before_filter :verify_authenticity_token
  
  def index
    
  end
  
  def query
    authorize! :query, :query
    users, result_per_user, user_availability_matches=User.query(params)
    user_results=users.map do |u|
      format_user(u).merge({
        matched_availabilities: Availability.where("id IN (?)", user_availability_matches.fetch(u.id, [])).map{|a| format_availability a},
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
