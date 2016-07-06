class SavedQueriesController < ApplicationController
  before_action :set_saved_query, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token
  include CompetenceFormatter
  
  # GET /saved_queries
  # GET /saved_queries.json
  def index
    @saved_queries = SavedQuery.all.map do |sq|
      {
        id: sq.id,
        name: sq.name,
        match_all: sq.match_all,
        competences: format_competence_list(sq.saved_query_competences)
      }
    end
    render json: @saved_queries
  end

  # GET /saved_queries/1
  # GET /saved_queries/1.json
  def show
  end

  # GET /saved_queries/new
  def new
    @saved_query = SavedQuery.new
  end

  # GET /saved_queries/1/edit
  def edit
  end

  # POST /saved_queries
  # POST /saved_queries.json
  def create
    ActiveRecord::Base.transaction do
      saved_query = SavedQuery.create!(name: params[:saved_query][:name], match_all: params[:saved_query][:match_all])
      params[:saved_query][:competences].each do |c|
        comp=Competence.find c[:competence_id]
        SavedQueryCompetence.create!(competence: comp, saved_query: saved_query, level: c[:level].to_i)
      end
    end
    return render json: {status: :ok}
  end

  # PATCH/PUT /saved_queries/1
  # PATCH/PUT /saved_queries/1.json
  def update
    respond_to do |format|
      if @saved_query.update(saved_query_params)
        format.html { redirect_to @saved_query, notice: 'Saved query was successfully updated.' }
        format.json { render :show, status: :ok, location: @saved_query }
      else
        format.html { render :edit }
        format.json { render json: @saved_query.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /saved_queries/1
  # DELETE /saved_queries/1.json
  def destroy
    @saved_query.destroy
    respond_to do |format|
      format.html { redirect_to saved_queries_url, notice: 'Saved query was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_saved_query
      @saved_query = SavedQuery.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def saved_query_params
      params.require(:saved_query).permit(:name, :match_all)
    end
end
