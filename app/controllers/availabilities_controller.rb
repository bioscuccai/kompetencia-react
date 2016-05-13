class AvailabilitiesController < ApplicationController
  load_and_authorize_resource
  
  before_action :set_availability, only: [:show, :edit, :update, :destroy, :turn_on, :turn_off]
  before_action :set_user, only: [:index, :create, :show, :edit, :update, :destroy, :turn_on, :turn_off]
  skip_before_filter :verify_authenticity_token
  
  include AvailabilityFormatter
  
  def godfather_availabilities
    @availabilities=Availability.includes(user: [:godfather]).for_godfather params[:user_id]
    render json: @availabilities.map{|a| format_availability(a, ignore_from_user: [:godfather, :competences])}
  end
  
  def recent
    @availabilities=Availability.recent.map do |a|
      format_availability a
    end
    render json: @availabilities
  end
  
  def turn_on
    @availability.update(active: true)
    render json: {status: :ok}
  end
  
  def turn_off
    @availability.update(active: false)
    render json: {status: :ok}
  end
  
  # GET /availabilities
  # GET /availabilities.json
  def index
    @availabilities = Availability.where(user_id: @user.id)
    render json: @availabilities.map{|a| format_availability a}
  end

  # GET /availabilities/1
  # GET /availabilities/1.json
  def show
  end

  # GET /availabilities/new
  def new
    @availability = @user.availabilities.build
  end

  # GET /availabilities/1/edit
  def edit
  end

  # POST /availabilities
  # POST /availabilities.json
  def create
    @availability = Availability.new(availability_params)
    @availability.user_id=@user.id

    respond_to do |format|
      if @availability.save
        format.html { redirect_to @availability, notice: 'Availability was successfully created.' }
        format.json { render :show, status: :created, location: user_availability_path(@user.id, @availability.id) }
      else
        format.html { render :new }
        format.json { render json: @availability.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /availabilities/1
  # PATCH/PUT /availabilities/1.json
  def update
    @availability.assign_attributes(availability_params)
    @availability.user_id=@user.id
    respond_to do |format|
      if @availability.save
        format.html { redirect_to [@user, @availability], notice: 'Availability was successfully updated.' }
        format.json { render :show, status: :ok, location: [@user, @availability ]}
      else
        format.html { render :edit }
        format.json { render json: @availability.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /availabilities/1
  # DELETE /availabilities/1.json
  def destroy
    @availability.destroy
    respond_to do |format|
      format.html { redirect_to availabilities_url, notice: 'Availability was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_availability
      @availability = Availability.find(params[:id])
    end
    
    def set_user
      @user = User.find(params[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def availability_params
      params.require(:availability).permit(:user_id, :starts_at, :ends_at, :comment, :work_hours)
    end
end
