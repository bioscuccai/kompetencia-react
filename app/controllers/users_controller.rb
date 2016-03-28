class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  include CompetenceFormatter
  def competences
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
    User.add_pending_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def accept_pending_competence
    
  end
  
  def reject_pending_competence
    
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
  
  def show
    @user=User.find params[:id]
    @all_competences=Competence.all
  end
end
