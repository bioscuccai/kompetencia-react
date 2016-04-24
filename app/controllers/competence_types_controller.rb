class CompetenceTypesController < ApplicationController
  load_and_authorize_resource
  
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
  
  
  # GET /competence_types/1
  # GET /competence_types/1.json
  def show
  end

  # GET /competence_types/new
  def new
    @competence_type = CompetenceType.new
  end

  # GET /competence_types/1/edit
  def edit
  end

  # POST /competence_types
  # POST /competence_types.json
  def create
    @competence_type = CompetenceType.new(competence_type_params)

    respond_to do |format|
      if @competence_type.save
        format.html { redirect_to @competence_type, notice: 'Competence type was successfully created.' }
        format.json { render :show, status: :created, location: @competence_type }
      else
        format.html { render :new }
        format.json { render json: @competence_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /competence_types/1
  # PATCH/PUT /competence_types/1.json
  def update
    respond_to do |format|
      if @competence_type.update(competence_type_params)
        format.html { redirect_to @competence_type, notice: 'Competence type was successfully updated.' }
        format.json { render :show, status: :ok, location: @competence_type }
      else
        format.html { render :edit }
        format.json { render json: @competence_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /competence_types/1
  # DELETE /competence_types/1.json
  def destroy
    @competence_type.destroy
    respond_to do |format|
      format.html { redirect_to competence_types_url, notice: 'Competence type was successfully destroyed.' }
      format.json { head :no_content }
    end
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
