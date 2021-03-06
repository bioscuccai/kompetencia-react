class QueryController < ApplicationController
  before_action :authenticate_user!
  
  include UserFormatter
  include AvailabilityFormatter
  
  skip_before_filter :verify_authenticity_token
  
  def index
    
  end
  
  def query
    authorize! :query, :query
    users, result_per_user, user_availability_matches=User.query(params.merge({subordinates_of: current_user}))
    level_names=CompetenceTier.tier_names
    #return render json: users

    user_results=users.includes(:availabilities, :godfather, :roles,
        users_skills: [:skill],
        assigned_competence_levels: [competence: [:competence_type]],
        pending_competence_levels: [competence: [:competence_type]],
        users_roles: [:role]).
      map.with_index do |u, index|
      format_user(u, level_names: level_names).merge({
        #matched_availabilities: u.availabilities.where("id IN (?)", user_availability_matches.fetch(u.id, [])).map{|a| format_availability a},
        original_index: index,
        relevance: result_per_user[u.id].count,
        matched_availabilities: u.availabilities.select{|a| user_availability_matches.fetch(u.id, []).include?(a.id) },
        found: result_per_user[u.id].map do |r|
          {
            competence_id: r,
            title: u.assigned_competence_levels.select{|acl| acl.competence_id==r}&.first&.competence&.title,
            level: u.assigned_competence_levels.select{|acl| acl.competence_id==r}&.first&.level,

            wanted: params[:competences].select{|c| c["competence_id"]==r}&.first&.fetch("level")
          }
        end
      })
    end
    render json: user_results
  end
end
