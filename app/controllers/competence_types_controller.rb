class CompetenceTypesController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_competence_type, only: [:show, :edit, :update, :destroy]
  
  skip_before_filter :verify_authenticity_token
  
  # GET /competence_types
  # GET /competence_types.json
  def index
    @competence_types = CompetenceType.all
  end

  def all
    competence_types=CompetenceType.includes(:competences, :competence_tier_group).all.map do |competence_type|
      {
        id: competence_type.id,
        title: competence_type.title,
        competence_tier_group: competence_type.competence_tier_group,
        competences: competence_type.competences.map do |competence|
          {
            id: competence.id,
            title: competence.title
          }
        end
      }
    end
    render json: competence_types
  end

  # POST /competence_types
  # POST /competence_types.json
  def create
    authorize! :create, CompetenceType
    
    @competence_type = CompetenceType.new(competence_type_params)

    @competence_type.save!
    render json: {status: :ok}
  end

  # PATCH/PUT /competence_types/1
  # PATCH/PUT /competence_types/1.json
  def update
    authorize! :update, CompetenceType
    @competence_type.update!(competence_type_params)
    render json: {status: :ok}
  end

  # DELETE /competence_types/1
  # DELETE /competence_types/1.json
  def destroy
    authorize! :destroy, CompetenceType
    
    @competence_type.destroy!
    render json: {status: :ok}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competence_type
      @competence_type = CompetenceType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def competence_type_params
      params.require(:competence_type).permit(:title, :competence_tier_group_id)
    end
end
