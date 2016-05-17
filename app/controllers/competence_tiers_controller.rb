class CompetenceTiersController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_competence_tier, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /competence_tiers
  # GET /competence_tiers.json
  def index
    @competence_tiers = CompetenceTier.all
  end

  # POST /competence_tiers
  # POST /competence_tiers.json
  def create
    authorize! :create, CompetenceTier
    
    @competence_tier = CompetenceTier.new(competence_tier_params)

    @competence_tier.save!
    render json: {status: :ok}
  end

  # PATCH/PUT /competence_tiers/1
  # PATCH/PUT /competence_tiers/1.json
  def update
    authorize! :update, CompetenceTier
    
    @competence_tier.update!(competence_tier_params)
    render json: {status: :ok}
  end

  # DELETE /competence_tiers/1
  # DELETE /competence_tiers/1.json
  def destroy
    authorize! :destroy, CompetenceTier
    
    @competence_tier.destroy!
    render json: {status: :ok}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competence_tier
      @competence_tier = CompetenceTier.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def competence_tier_params
      params.require(:competence_tier).permit(:title, :description, :competence_tier_group_id)
    end
end
