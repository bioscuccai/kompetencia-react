class CompetenceTiersController < ApplicationController
  before_action :set_competence_tier, only: [:show, :edit, :update, :destroy]

  # GET /competence_tiers
  # GET /competence_tiers.json
  def index
    @competence_tiers = CompetenceTier.all
  end

  # GET /competence_tiers/1
  # GET /competence_tiers/1.json
  def show
  end

  # GET /competence_tiers/new
  def new
    @competence_tier = CompetenceTier.new
  end

  # GET /competence_tiers/1/edit
  def edit
  end

  # POST /competence_tiers
  # POST /competence_tiers.json
  def create
    @competence_tier = CompetenceTier.new(competence_tier_params)

    respond_to do |format|
      if @competence_tier.save
        format.html { redirect_to @competence_tier, notice: 'Competence tier was successfully created.' }
        format.json { render :show, status: :created, location: @competence_tier }
      else
        format.html { render :new }
        format.json { render json: @competence_tier.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /competence_tiers/1
  # PATCH/PUT /competence_tiers/1.json
  def update
    respond_to do |format|
      if @competence_tier.update(competence_tier_params)
        format.html { redirect_to @competence_tier, notice: 'Competence tier was successfully updated.' }
        format.json { render :show, status: :ok, location: @competence_tier }
      else
        format.html { render :edit }
        format.json { render json: @competence_tier.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /competence_tiers/1
  # DELETE /competence_tiers/1.json
  def destroy
    @competence_tier.destroy
    respond_to do |format|
      format.html { redirect_to competence_tiers_url, notice: 'Competence tier was successfully destroyed.' }
      format.json { head :no_content }
    end
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
