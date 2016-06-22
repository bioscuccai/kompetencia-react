class SkillsController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_skill, only: [:destroy, :confirm]
  before_action :set_user, only: [:create, :confirm, :destroy]
  skip_before_filter :verify_authenticity_token
  
  # GET /skills
  # GET /skills.json
  def index
    #authorize! [:index], Skills
    
    if params[:user_id]
      
      @skills=User.find(params[:user_id]).users_skills.map{|s| s.formatted}
    else
      @skills = Skill.all
    end
    render json: @skills
  end

  def create
    can_create=false
    can_create=true if current_user.has_role? :admin
    can_create=true if current_user.has_role?(:godfather) && @user.godfather_id == current_user.id
    can_create=true if current_user.id==@user.id
    raise CanCan::AccessDenied if !can_create
    
    @skill = Skill.find_or_create_by(name: ActionView::Base.full_sanitizer.sanitize(params[:skill][:name]))
    @users_skill=@user.users_skills.find_or_create_by(user_id: @user.id, skill_id: @skill.id)
    
    confirmed=false
    confirmed=true if current_user.has_role? :admin
    confirmed=true if current_user.has_role?(:godfather) && @user.id==current_user.id
    confirmed=true if current_user.has_role?(:godfather) && @user.godfather_id==current_user.id
    
    @users_skill.update(confirmed: confirmed)
    render json: @users_skill.formatted
  end

  def destroy
    if params[:user_id]
      can_destroy=false
      can_destroy=true if current_user.has_role? :admin
      can_destroy=true if current_user.has_role?(:godfather) && @user.godfather_id == current_user.id
      can_destroy=true if current_user.id==@user.id
      raise CanCan::AccessDenied if !can_destroy
      
      UsersSkill.where(user_id: params[:user_id], skill_id: params[:id]).destroy_all
    else
      raise CanCan::AccessDenied if !current_user.has_role?(:admin)
      
      @skill.destroy
    end
    render json: {status: :ok}
  end
  
  def confirm
    raise CanCan::AccessDenied if !current_user.has_authority_over?(User.find(params[:user_id]))
    
    @users_skill=UsersSkill.find_by(user_id: params[:user_id], skill_id: params[:id])
    
    @users_skill.update!(confirmed: true)
    render json: {status: :ok}
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_skill
      @skill = Skill.find(params[:id])
    end
    
    def set_user
      @user=User.find(params[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def skill_params
      params.require(:skill).permit(:name, :description)
    end
end
