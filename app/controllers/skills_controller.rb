class SkillsController < ApplicationController
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
    @skill = Skill.find_or_create_by(name: params[:skill][:name])
    @users_skill=@user.users_skills.create(skill: @skill)
    render json: @users_skill.formatted
  end

  def destroy
    if params[:user_id]
      UsersSkill.where(user_id: params[:user_id], skill_id: params[:id]).destroy_all
    else
      @skill.destroy
    end
    render json: {status: :ok}
  end
  
  def confirm
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
