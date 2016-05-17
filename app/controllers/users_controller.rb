class UsersController < ApplicationController  
  skip_before_filter :verify_authenticity_token
  before_action :set_user, only: [:assigned_competences, :add_competence, :pending_competences,
    :add_pending_competence, :accept_pending_competence,
    :reject_pending_competence, :remove_competence, :remove_pending_competence,
    :add_godfather, :remove_godfather,
    :make_admin, :revoke_admin, :make_godfather, :revoke_godfather]
  
  include CompetenceFormatter
  include UserFormatter
  
  def assigned_competences
    render json: format_competence_list(@user.assigned_competence_levels)
  end
  
  def add_competence
    authorize! :add_competence, @user

    @competence=Competence.find params[:competence_id]
    @user.add_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def pending_competences
    render json: format_competence_list(@user.pending_competence_levels)
  end
  
  def add_pending_competence
    authorize! :add_pending_competence, @user

    @competence=Competence.find params[:competence_id]
    @user.add_pending_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def accept_pending_competence
    authorize! :accept_competence, @user
    
    @user.accept_pending_competence params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def reject_pending_competence
    authorize! :reject_pending_competence, @user

    @user.remove_pending_competence params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def remove_competence
    authorize! :remove_competence, @user

    competence=Competence.find params[:competence_id].to_i
    @user.remove_competence competence
    render json: {status: :ok}
  end
  
  #TODO: ez mi?
  def remove_pending_competence
    authorize! :remove_competence, @user

    competence=Competence.find params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def index
    @users=User.all
    user_data=User.includes(:godfather, assigned_competence_levels: [:competence]).all.map do |u|
      #TODO: rolify-al megoldani a keresztapasagot, csak nagyon nem tetszik neki
      #hogy ugyanarra a modelre vonatkozik a resourcify es a rolify-va
      #ugyhogy marad az old-school relacio
      format_user u
    end
    respond_to do |format|
      format.html{}
      format.json do
        render json: user_data
      end
    end
  end
  
  def add_godfather
    authorize! :add_godfather, @user
    
    godfather=User.find params[:godfather_id]
    if godfather.has_role?(:godfather)
      @user.godfather=godfather
      @user.save!
      render json: {status: :ok}
    else
      render json: {status: :error, message: 'NOT_GODFATHER'}
    end
  end
  
  def remove_godfather
    authorize! :remove_godfather, @user

    @user.godfather=nil
    @user.save!
    render json: {status: :ok}
  end
  
  def competences
    @user=User.find params[:id]
    @all_competences=Competence.all
  end
  
  def show
    @user=User.includes(users_skills: [:skill], assigned_competence_levels: [competence: [:competence_type]]).find params[:id]
    @tiers=CompetenceTier.all
    @tier_names=@tiers.
      group_by(&:competence_tier_group_id)
    @tier_names.keys.each do |k|
      @tier_names[k]=@tier_names[k].map{|v| [v.level, v.title]}.to_h
    end
    #@tier_names.keys.map{|k| @tier_names[k].map{|v| [v.level, v.title]}.to_h}
    @tier_groups=(@user.assigned_competence_levels.map do |tl|
      {
        id: tl.competence_id,
        title: tl.competence.title,
        type: tl.competence&.competence_type&.title,
        group_id: tl&.competence&.competence_type&.competence_tier_group_id,
        level: tl.level
      }
    end).group_by{|g| g[:type]}
    pp @tier_names
    @tier_group_names=@tier_groups.keys

    respond_to do |fmt|
      fmt.html{}
      fmt.json do
        render json: format_user(@user)
      end
    end
  end
  
  def home
    
  end
  
  def landing
    return redirect_to new_user_session_path unless user_signed_in?
    render 'landing', layout: 'app'
  end
  
  def make_admin
    authorize! :make_admin, @user
    
    @user=User.find params[:id]
    @user.add_role :admin
    render json: {status: :ok}
  end
  
  def revoke_admin
    authorize! :revoke_admin, @user
    
    @user=User.find params[:id]
    @user.remove_role :admin
    render json: {status: :ok}
  end
  
  def make_godfather
    authorize! :make_godfather, @user
    
    @user=User.find params[:id]
    @user.add_role :godfather
    render json: {status: :ok}
  end
  
  def revoke_godfather
    authorize! :revoke_godfather, @user
    
    @user=User.find params[:id]
    @user.remove_role :godfather
    render json: {status: :ok}
  end
  
  def subordinates
    @user=User.find params[:id]
  end
  
  private
    def set_user
      @user=User.find(params[:id])
    end
end
