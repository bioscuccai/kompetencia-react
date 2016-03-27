class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def competences
    @user=User.find params[:id]
    render json: @user.competences
  end
  
  def add_competence
    @user=User.find params[:id]
    @competence=Competence.find params[:competence_id]
    @user.add_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def pending_competences
    @user=User.find params[:id]
    render json: @user.pending_competences
  end
  
  def add_pending_competence
    @user=User.find params[:id]
    @competence=Competence.find params[:competence_id]
    User.add_pending_competence @competence, params[:level].to_i
    render json: @competence
  end
  
  def show
    
  end
end
