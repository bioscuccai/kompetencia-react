class PersonRequestsController < ApplicationController
  load_and_authorize_resource
  
  before_action :set_person_request, only: [:show, :edit, :update, :destroy,
    :accept, :accept_no_collision, :reject]
  before_action :set_user, only: [:index, :show, :edit, :update, :destroy, :create, :new,
    :relevant, :collisions,
    :accept, :accept_no_collision, :reject]

  skip_before_filter :verify_authenticity_token
  
  include UserFormatter
  include PersonRequestFormatter
  
  def accept
    ActiveRecord::Base.transaction do
      collisions=Availability.where(user_id: @person_request.target_id).where('ends_at IS NOT NULL').collisions_two(@person_request.starts_at, @person_request.ends_at)
      collisions.update_all(active: false)
      @person_request.update(confirmed: true)
    end
    render json: {status: :ok}
  end
  
  def accept_no_collision
    @person_request.update!(confirmed: true)
    render json: {status: :ok}
  end
  
  def reject
    @person_request.update!(confirmed: false)
    render json: {status: :ok}
  end
  
  # GET /person_requests
  # GET /person_requests.json
  def index
    @person_requests = PersonRequest.joins(:target, :user).where(user_id: @user.id)
    respond_to do |fmt|
      fmt.html{}
      fmt.json do
        @formatted=@person_requests.map do |p|
          format_person_request p
        end
        render json: @formatted
      end
    end
  end
  
  def relevant
    @formatted=PersonRequest.joins(target: [:godfather]).relevant_for(@user.id).map{|p| format_person_request(p)}
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
  
  
  # GET /person_requests/1
  # GET /person_requests/1.json
  def show
  end

  # GET /person_requests/new
  def new
    @person_request = PersonRequest.new
    @person_request.user_id=params[:user_id]
  end

  # GET /person_requests/1/edit
  def edit
  end

  # POST /person_requests
  # POST /person_requests.json
  def create
    @person_request = PersonRequest.new(person_request_params)
    @person_request.user_id=@user.id
    respond_to do |format|
      if @person_request.save
        format.html { redirect_to user_person_requests_url(@user, @person_request), notice: 'Person request was successfully created.' }
        format.json { render :show, status: :created, location: user_person_request_path(@user, @person_request) }
      else
        format.html { render :new }
        format.json { render json: @person_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /person_requests/1
  # PATCH/PUT /person_requests/1.json
  def update
    @person_request.user_id=@user.id
    respond_to do |format|
      if @person_request.update(person_request_params)
        format.html { redirect_to @person_request, notice: 'Person request was successfully updated.' }
        format.json { render :show, status: :ok, location: user_person_request_path(@user, @person_request) }
      else
        format.html { render :edit }
        format.json { render json: @person_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /person_requests/1
  # DELETE /person_requests/1.json
  def destroy
    @person_request.destroy
    respond_to do |format|
      format.html { redirect_to user_person_requests_url(@user), notice: 'Person request was successfully destroyed.' }
      format.json { render plain: "" }
    end
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
