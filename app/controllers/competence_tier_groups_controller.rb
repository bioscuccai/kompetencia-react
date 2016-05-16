class CompetenceTierGroupsController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_competence_tier_group, only: [:show, :edit, :update, :destroy]
  
  skip_before_filter :verify_authenticity_token
  

  # GET /competence_tier_groups
  # GET /competence_tier_groups.json
  def index
    @competence_tier_groups = CompetenceTierGroup.all
  end

  #apihoz
  def all
    tier_groups=CompetenceTierGroup.all.includes(:competence_tiers).map do |tier_group|
      {
        id: tier_group.id,
        title: tier_group.title,
        description: tier_group.description,
        tiers: tier_group.competence_tiers.map do |tier|
          {
            id: tier.id,
            title: tier.title,
            description: tier.description,
            level: tier.level
          }
        end
      }
    end
    render json: tier_groups
  end

  # POST /competence_tier_groups
  # POST /competence_tier_groups.json
  def create
    authorize! :create, CompetenceTierGroup
    
    @competence_tier_group = CompetenceTierGroup.new(competence_tier_group_params)

    respond_to do |format|
      if @competence_tier_group.save
        format.html { redirect_to @competence_tier_group, notice: 'Competence tier group was successfully created.' }
        format.json { render :show, status: :created, location: @competence_tier_group }
      else
        format.html { render :new }
        format.json { render json: @competence_tier_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /competence_tier_groups/1
  # PATCH/PUT /competence_tier_groups/1.json
  def update
    authorize! :update, CompetenceTierGroup
    
    respond_to do |format|
      if @competence_tier_group.update(competence_tier_group_params)
        format.html { redirect_to @competence_tier_group, notice: 'Competence tier group was successfully updated.' }
        format.json { render :show, status: :ok, location: @competence_tier_group }
      else
        format.html { render :edit }
        format.json { render json: @competence_tier_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /competence_tier_groups/1
  # DELETE /competence_tier_groups/1.json
  def destroy
    authorize! :destroy, CompetenceTierGroup
    
    @competence_tier_group.destroy
    respond_to do |format|
      format.html { redirect_to competence_tier_groups_url, notice: 'Competence tier group was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competence_tier_group
      @competence_tier_group = CompetenceTierGroup.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def competence_tier_group_params
      params.require(:competence_tier_group).permit(:title, :description)
    end
end
