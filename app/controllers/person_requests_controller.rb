class PersonRequestsController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_person_request, only: [:show, :edit, :update, :destroy,
    :accept, :accept_no_collision, :reject]
  before_action :set_user, only: [:index, :show, :edit, :update, :destroy, :create, :new,
    :relevant, :collisions,
    :accept, :accept_no_collision, :reject]

  skip_before_filter :verify_authenticity_token
  
  include UserFormatter
  include PersonRequestFormatter
  
  def accept
    authorize! :accept, @person_request
    
    ActiveRecord::Base.transaction do
      collisions=Availability.where(user_id: @person_request.target_id).where('ends_at IS NOT NULL').collisions_two(@person_request.starts_at, @person_request.ends_at)
      collisions.update_all(active: false)
      @person_request.update(confirmed: true, trigger_notification_mail: true)
    end
    render json: {status: :ok}
  end
  
  def accept_no_collision
    authorize! :accept_no_collision, @person_request
    
    @person_request.update!(confirmed: true, trigger_notification_mail: true)
    render json: {status: :ok}
  end
  
  def reject
    authorize! :reject, @person_request
    
    @person_request.update!(confirmed: false, trigger_notification_mail: true)
    render json: {status: :ok}
  end
  
  # GET /person_requests
  # GET /person_requests.json
  def index
    @person_requests = PersonRequest.joins(:target, :user).where(user_id: @user.id)

    @formatted=@person_requests.map do |p|
      format_person_request p
    end
    render json: @formatted
  end
  
  def relevant
    @formatted=PersonRequest.joins(:target).where("users.godfather_id=?", @user.id).map{|p| format_person_request(p)}
    render json: @formatted
  end

  def collisions
    #if !params[:ends_at].nil?
      
    #else
    #  @collisions=PersonRequest.collisions_one(Time.parse(params[:starts_at]))
    #end
    @collisions=[
      *Availability.where(user_id: @user.id).where('active=true AND ends_at IS NOT NULL').collisions_two(Time.parse(params[:starts_at]), Time.parse(params[:ends_at])).to_a,
      #*Availablity.where('ends_at IS NULL').collisions_two(Time.parse(params[:starts_at]), Time.parse(params[:ends_at])).to_a
    ].flatten.uniq
    render json: @collisions
  end

  # POST /person_requests
  # POST /person_requests.json
  def create
    authorize! :create, PersonRequest
    
    @person_request = PersonRequest.new(person_request_params)
    @person_request.user_id=@user.id
    @person_request.save!
    render json: {status: :ok}
  end

  # PATCH/PUT /person_requests/1
  # PATCH/PUT /person_requests/1.json
  def update
    authorize! :update, @person_request
    
    #@person_request.user_id=@user.id
    #@person_request.update!(person_request_params.merge(trigger_notification_mail: (@person_request.user_id==current_user.id)))
    @person_request.update!(person_request_params)
    render json: {status: :ok}
  end

  # DELETE /person_requests/1
  # DELETE /person_requests/1.json
  def destroy
    authorize! :destroy, @person_request

    @person_request.destroy!
    render json: {status: :ok}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person_request
      @person_request = PersonRequest.find(params[:id])
    end
    
    def set_user
      @user=User.find params[:user_id]
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_request_params
      params.require(:person_request).permit(:user_id, :target_id, :starts_at, :ends_at, :chance, :title, :comment)
    end
end
