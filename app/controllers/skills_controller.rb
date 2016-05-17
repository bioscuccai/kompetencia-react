class SkillsController < ApplicationController
  before_action :authenticate_user!
  
  before_action :set_skill, only: [:destroy, :confirm]
  before_action :set_user, only: [:create, :confirm]
  skip_before_filter :verify_authenticity_token
  
  # GET /skills
  # GET /skills.json
  def index
    if params[:user_id]
      
      @skills=User.find(params[:user_id]).users_skills.map{|s| s.formatted}
    else
      @skills = Skill.all
    end
    render json: @skills
  end

  def create
    #TODO: getto jogkor kezeles
    raise CanCan::AccessDenied if !current_user.has_role?(:admin) && !current_user.has_role?(:godfather) && !(current_user.id!=params[:id])
    
    @skill = Skill.find_or_create_by(name: params[:skill][:name])
    @users_skill=@user.users_skills.find_or_create_by(user_id: @user.id, skill_id: @skill.id)
    @users_skill.update(confirmed: true) if current_user.has_role?(:godfather) || current_user.has_role?(:admin)
    render json: @users_skill.formatted
  end

  def destroy
    if params[:user_id]
      raise CanCan::AccessDenied if !current_user.has_role?(:admin) && !current_user.has_role?(:godfather) && !(current_user.id!=params[:id])
      
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
