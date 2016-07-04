class QueryController < ApplicationController
  before_action :authenticate_user!
  
  include UserFormatter
  include AvailabilityFormatter
  
  skip_before_filter :verify_authenticity_token
  
  def index
    
  end
  
  def query
    authorize! :query, :query
    Rails.logger.info(params)
    result_per_user=Hash.new{|h,k| h[k]=[]}
    users=[]
    user_availability_matches=[]
    
    
    
    base_query=User.includes(:availabilities, :godfather, assigned_competence_levels: [:competence])
    if params[:selected_skill_ids] && params[:selected_skill_ids].count!=0
      users=base_query.has_skills(params[:selected_skill_ids]).to_a
    end
    
    competence_ids=params[:competences] ? params[:competences].map{|c| c['competence_id']} : []
    
    if params[:match_all]
      assigned_users=User.joins(:assigned_competence_levels).where("assigned_competence_levels.competence_id IN (?)", competence_ids).to_a
      pending_users=User.joins(:pending_competence_levels).where("pending_competence_levels.competence_id IN(?)", competence_ids).to_a
      
      user_ids_=(assigned_users.map(&:id) + pending_users.map(&:id)).uniq
      proper_user_ids=[]
      user_ids_.each do |uid|
        if assigned_users.select{|u| u.id==uid}.count + pending_users.select{|u| u.id==uid}.count == params[:competences].count
          proper_user_ids.push uid
          result_per_user[uid]=competence_ids
        end
      end
      
      users=User.includes(:assigned_competence_levels, :pending_competence_levels).where("id IN (?)", proper_user_ids)
    else
      if params[:competences].present?
        params[:competences].each do |c|
          res=base_query.has_level(c['competence_id'], c['level']).to_a
          
          if params[:show_pending]
            res=res + (base_query.has_pending_level(c['competence_id'], c['level']).to_a)
          end
          
          if params[:check_date] && params[:starts_at].present? && params[:ends_at].present?
            res_with_date=res.select do |u|
              availability_matches=[]
              if params[:not_strict_search]
                availability_matches=u.availabilities_between_not_strict(Time.parse(params[:starts_at]), Time.parse(params[:ends_at]))
              else
                availability_matches=u.availabilities_between(Time.parse(params[:starts_at]), Time.parse(params[:ends_at]))
              end
              
              if availability_matches.count!=0
                user_availability_matches[u.id]=user_availability_matches.fetch(u.id, []) + availability_matches.map(&:id)
              end
              
              availability_matches.count!=0
            end
          else
            res_with_date=res
          end
          
          users.push res_with_date
          res_with_date.each do |u|
            (result_per_user[u.id]).push c["competence_id"]
          end
        end
      else
        if params[:check_date] && params[:starts_at].present? && params[:ends_at].present?
          #TODO: ez valami eszmeletlen gaz, de par ora mulva demo
          users=User.all.select{|u| u.availabilities_between(Time.parse(params[:starts_at]), Time.parse(params[:ends_at])).count!=0}
        else
          users=User.all #TODO: oke ez igy?
        end
      end
    end
    
    users=users.flatten.uniq
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
