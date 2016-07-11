require 'csv'

class ReportsController < ApplicationController
  before_action :set_report, only: [:show, :edit, :update, :destroy, :results]
  skip_before_filter :verify_authenticity_token
  before_action :restrict_admin
  
  include CompetenceFormatter
  include ReportFormatter
  
  def index
    reports = Report.all.includes(:saved_queries).map{|r| format_report(r)}
    render json: reports
  end

  def show
    report=Report.find params[:id]
    render json: format_report(report)
  end

  def create
    ActiveRecord::Base.transaction do
      report=Report.create!(name: params[:report][:name])
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
      @report.update!(name: params[:report][:name])
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
    @report.destroy
    render json: {status: :ok}
  end
  
  def results
    res=[]
    @report.saved_queries.each do |sq|
      competence_params=sq.competence_query_params
      users, a, b=User.query({competences: competence_params,
        match_all: sq.match_all,
        show_pending: sq.show_pending})
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
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:name)
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
