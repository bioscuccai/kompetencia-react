class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  include CompetenceFormatter
  
  def assigned_competences
    user=User.find params[:id]
    render json: format_competence_list(user.assigned_competence_levels)
  end
  
  def add_competence
    @user=User.find params[:id]
    @competence=Competence.find params[:competence_id]
    @user.add_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def pending_competences
    user=User.find params[:id]
    render json: format_competence_list(user.pending_competence_levels)
  end
  
  def add_pending_competence
    @user=User.find params[:id]
    @competence=Competence.find params[:competence_id]
    @user.add_pending_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def accept_pending_competence
    @user=User.find params[:id]
    @user.accept_pending_competence params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def reject_pending_competence
    @user=User.find params[:id]
    @user.remove_pending_competence params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def remove_competence
    Rails.logger.info params
    user=User.find params[:id].to_i
    competence=Competence.find params[:competence_id].to_i
    user.remove_competence competence
    render json: {status: :ok}
  end
  
  def remove_pending_competence
    user=User.find params[:id].to_i
    competence=Competence.find params[:competence_id].to_i
    
    render json: {status: :ok}
  end
  
  def index
    @users=User.all
    user_data=User.includes(:godfather, assigned_competence_levels: [:competence]).all.map do |u|
      #TODO: rolify-al megoldani a keresztapasagot, csak nagyon nem tetszik neki
      #hogy ugyanarra a modelre vonatkozik a resourcify es a rolify-va
      #ugyhogy marad az old-school relacio
      {
        id: u.id,
        email: u.email,
        available: u.available?,
        competences: (u.assigned_competence_levels.map do |acl|
          {
            id: acl.competence_id,
            title: acl.competence.title,
            level: acl.level
          }
        end),
        godfather_id: u.godfather_id,
        godfather: (u.godfather.nil? ? nil : ({
          id: u.godfather.id,
          email: u.godfather.email
        }))
      }
    end
    respond_to do |format|
      format.html{}
      format.json do
        render json: user_data
      end
    end
  end
  
  def add_godfather
    user=User.find params[:id]
    godfather=User.find params[:godfather_id]
    if godfather.has_role?(:godfather)
      user.godfather=godfather
      user.save!
      render json: {status: :ok}
    else
      render json: {status: :error}
    end
  end
  
  def remove_godfather
    user=User.find params[:id]
    user.godfather=nil
    user.save!
    render json: {status: :ok}
  end
  
  def competences
    @user=User.find params[:id]
    @all_competences=Competence.all
  end
  
  def show
    @user=User.includes(assigned_competence_levels: [competence: [:competence_type]]).find params[:id]
    @tiers=CompetenceTier.all
    @tier_names=@tiers.
      group_by(&:competence_tier_group_id)
    @tier_names.keys.each do |k|
      @tier_names[k]=@tier_names[k].map{|v| [v.level, v.title]}.to_h
    end
    #@tier_names.keys.map{|k| @tier_names[k].map{|v| [v.level, v.title]}.to_h}
    pp @tier_names
  end
  
  def home
    
  end
  
  def add_admin
    @user=User.find params[:id]
    @user.add_role :admin
    redirect_to users_path
  end
  
  def remove_admin
    @user=User.find params[:id]
    @user.remove_role :admin
    redirect_to users_path
  end
  
  def subordinates
    @user=User.find params[:id]
  end
end
