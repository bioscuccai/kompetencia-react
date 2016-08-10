require 'csv'

class ReportsController < ApplicationController
  include CompetenceFormatter
  include ReportFormatter
  include RestrictAccess
  
  before_action :set_report, only: [:show, :edit, :update, :destroy, :results, :matrix]
  skip_before_filter :verify_authenticity_token
  before_action :restrict_admin_godfather
  
  def index
    reports = Report.visible_for(current_user.id).includes(:saved_queries).map{|r| format_report(r)}
    render json: reports
  end

  def show
    report=Report.find params[:id]
    render json: format_report(report)
  end

  def create
    ActiveRecord::Base.transaction do
      report=Report.create!(name: params[:report][:name], unpublished: params[:report][:unpublished], user_id: current_user.id)
      params[:report][:saved_query_ids].each do |sqi|
        saved_query=SavedQuery.find sqi
        ReportSavedQuery.create!(report: report, saved_query: saved_query)
      end
    end
    render json: {status: :ok}
  end

  # PATCH/PUT /reports/1
  # PATCH/PUT /reports/1.json
  def update
    ActiveRecord::Base.transaction do
      @report.update!(name: params[:report][:name], unpublished: params[:report][:unpublished])
      @report.report_saved_queries.where('saved_query_id NOT IN (?)', params[:report][:saved_query_ids].map{|sqi| sqi.to_i}).destroy_all
      
      saved_query_ids=@report.saved_queries.map{|sq| sq.id}
      to_add=params[:report][:saved_query_ids].map{|sqi| sqi.to_i} - saved_query_ids
      to_add.each do |ta|
        ReportSavedQuery.create!(saved_query_id: ta, report_id: @report.id)
      end
    end
    
    render json: {status: :ok}
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
    @report.destroy!
    render json: {status: :ok}
  end
  
  def results
    res=[]
    @report.saved_queries.each do |sq|
      competence_params=sq.competence_query_params
      users, a, b=User.query({competences: competence_params,
        match_all: sq.match_all,
        show_pending: sq.show_pending,
        only_subordinates: sq.only_subordinates,
        subordinates_of: current_user})
      res.push({
        name: sq.name,
        value: users.count
      })
    end
    respond_to do |format|
      format.csv{send_data csv_convert(res)}
      format.json{render json: res}
    end
  end
  
  def matrix
    competence_ids=@report.saved_queries.map do |sq|
      sq.saved_query_competences.map do |sqc|
        sqc.competence_id
      end
    end
    competence_ids=competence_ids.flatten.uniq
    
    competences=Competence.where('id IN (?)', competence_ids)
    
    # competence_tier_groups=competences.map{|c| c&.competence_type&.competence_tier_group}.compact.uniq
    # pp competence_tier_groups
    
    competence_types=competences.map{|c| c&.competence_type}.compact.uniq
    
    ct_resp=competence_types.map do |ct|
      ct_competences=competences.select{|c| c.competence_type_id==ct.id}
      {
        id: ct.id,
        competence_type: ct.title,
        tiers: ct&.competence_tier_group&.competence_tiers.map do |cti|
          {
            title: cti.title,
            level: cti.level
          }
        end,
        competences: ct_competences.map do |c|
          {
            id: c.id,
            title: c.title,
            levels: (0...c&.competence_type&.competence_tier_group&.competence_tiers.count).map do |l|
              {
                assigned: AssignedCompetenceLevel.where(level: l, competence_id: c.id).count,
                pending:  PendingCompetenceLevel.where(level: l, competence_id: c.id).count
              }
            end
          }
        end
      }
    end
    
    # competence_results=competences.map do |c|
    #   max_level=c&.competence_type&.competence_tier_group&.competence_tiers.count
    #   if max_level
    #     {
    #       title: c.title,
    #       levels: (0...max_level).map do |l|
    #         {
    #           title: c&.competence_type&.competence_tier_group&.competence_tiers.find_by(level: l)&.title,
    #           assigned: AssignedCompetenceLevel.where(level: l, competence_id: c.id).count,
    #           pending:  PendingCompetenceLevel.where(level: l, competence_id: c.id).count
    #         }
    #       end
    #     }
    #   else
    #     nil
    #   end
    # end
    
    render json: ct_resp
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:name, :unpublised)
    end
    
    def csv_convert res
      CSV.generate do |csv|
        csv<<[:name, :value]
        res.each do |r|
          csv<<[r[:name], r[:value]]
        end
      end
    end
    
    def restrict_admin
      raise CanCan::AccessDenied unless current_user.has_role?(:admin)
    end
end
