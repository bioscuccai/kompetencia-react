class PersonRequestsController < ApplicationController
  before_action :set_person_request, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:index, :show, :edit, :update, :destroy, :create, :new, :relevant]
  skip_before_filter :verify_authenticity_token
  
  include UserFormatter
  include PersonRequestFormatter
  
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
    PersonRequest.joins(target: [:godfather])
    @formatted=PersonRequest.relevant_for(@user.id).map{|p| format_person_request(p)}
    render json: @formatted
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
    pp current_user
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
