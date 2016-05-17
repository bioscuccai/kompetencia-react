class AvailabilitiesController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_availability, only: [:show, :edit, :update, :destroy, :turn_on, :turn_off]
  before_action :set_user, only: [:index, :create, :show, :edit, :update, :destroy, :turn_on, :turn_off]
  skip_before_filter :verify_authenticity_token
  
  include AvailabilityFormatter
  
  def godfather_availabilities
    #raise CanCan::AccessDenied if current_user.id!=params[:id]
    
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
    authorize! :turn_on, @availability
    
    @availability.update(active: true)
    render json: {status: :ok}
  end
  
  def turn_off
    authorize! :turn_off, @availability
    
    @availability.update(active: false)
    render json: {status: :ok}
  end
  
  # GET /availabilities
  # GET /availabilities.json
  def index
    @availabilities = Availability.where(user_id: @user.id)
    render json: @availabilities.map{|a| format_availability a}
  end

  # POST /availabilities
  # POST /availabilities.json
  def create
    raise CanCan::AccessDenied if !current_user.has_authority_over?(User.find params[:user_id])
    
    @availability = Availability.new(availability_params)
    @availability.user_id=@user.id

      if @availability.save
        render json: {status: :ok}
      else
        rendet json: {status: :error, error: @availability.errors}
      end
  end

  # PATCH/PUT /availabilities/1
  # PATCH/PUT /availabilities/1.json
  def update
    authorize! :update, @availability
    pp "can update"
    @availability.assign_attributes(availability_params)
    @availability.user_id=@user.id

    if @availability.save
      render json: {status: :ok}
    else
      render json: @availability.errors, status: :unprocessable_entity
    end

  end

  # DELETE /availabilities/1
  # DELETE /availabilities/1.json
  def destroy
    authorize! :destroy, @availability
    @availability.destroy!

    render json: {status: :ok}
    
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
      #active direkt nincs itt
      params.require(:availability).permit(:user_id, :starts_at, :ends_at, :comment, :work_hours)
    end
end
