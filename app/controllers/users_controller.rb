class UsersController < ApplicationController  
  skip_before_filter :verify_authenticity_token
  
  before_action :authenticate_user!, only: [:index, :assigned_competences, :add_competence, :pending_competences,
    :add_pending_competence, :accept_pending_competence, :mass_accept_pending, :reject_pending_competence,
    :remove_competence, :remove_pending_competence, :add_godfather, :remove_godfather, :competence, :show,
    :make_admin, :revoke_admin, :make_godfather, :revoke_godfather, :todos, :change, :upload_cv, :godfathers,
    :notify_seen_relevant, :notify_seen_requested, :notify_seen_by_godfather]
  
  before_action :set_user, only: [:assigned_competences, :add_competence, :pending_competences,
    :add_pending_competence, :accept_pending_competence,
    :reject_pending_competence, :remove_competence, :remove_pending_competence, :mass_accept_pending,
    :add_godfather, :remove_godfather,
    :make_admin, :revoke_admin, :make_godfather, :revoke_godfather,
    :notify_seen_by_godfather]
  
  WORK_PLACES=['SZTE', 'FEA', 'AENSYS']
  
  include CompetenceFormatter
  include UserFormatter
  
  def assigned_competences
    render json: format_competence_list(@user.assigned_competence_levels)
  end
  
  def add_competence
    authorize! :add_competence, @user

    @competence=Competence.find params[:competence_id]
    @user.add_competence @competence, params[:level].to_i
    render json:{status: :ok}
  end
  
  def pending_competences
    render json: format_competence_list(@user.pending_competence_levels)
  end
  
  def add_pending_competence
    authorize! :add_pending_competence, @user

    @competence=Competence.find params[:competence_id]
    @user.add_pending_competence @competence, params[:level].to_i
    render json: {status: :ok}
  end
  
  def accept_pending_competence
    authorize! :accept_pending_competence, @user
    
    @user.accept_pending_competence params[:competence_id].to_i
    render json: {status: :ok}
  end
  
  def mass_accept_pending
    authorize! :accept_pending_competence, @user
    render status: 500 if !params[:competence_ids].present? && !params[:competence_ids].respond_to?(:each)

    params[:competence_ids].each do |id|
      @user.accept_pending_competence id
    end
    
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
    authorize! :index, User
    @users=User.all
    user_data=User.includes(:godfather, assigned_competence_levels: [:competence]).all.map do |u|
      #TODO: rolify-al megoldani a keresztapasagot, csak nagyon nem tetszik neki
      #hogy ugyanarra a modelre vonatkozik a resourcify es a rolify-va
      #ugyhogy marad az old-school relacio
      format_user u
    end

    render json: user_data

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
    authorize! :show, @user
    
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
    @tier_group_names=@tier_groups.keys

    respond_to do |fmt|
      fmt.html{}
      fmt.json do
        render json: format_user(@user)
      end
    end
  end
  
  def godfathers
    gf=User.with_role(:godfather).map do |u|
      format_user u
    end
    render json: gf
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
  
  def todos
    pending_subordinates=[
      *(PendingCompetenceLevel.joins(:user).includes(:user).
        where("users.godfather_id=?", current_user.id).
        map do |cl|
          {
            id: cl.user_id,
            name: cl.user.name
          }
        end
      ),
      *(UsersSkill.joins(:user).
        where(confirmed: false).
        where("users.godfather_id=?", current_user.id).
        map do |us| {
            id: us.user_id,
            name: us.user.name
          }
        end
      )#,
      # *(User.
      #   where("cv_updated_at IS NOT NULL AND cv_updated_at>=?", last_activity)).
      #   map do |u|
      #     {
      #       id: u.id,
      #       name: u.name,
      #       type: :cv
      #     }
      #   end
    ].flatten.uniq{|u| u[:id]}
    
    changed_relevant=current_user.notification_relevant.
      map do |pr|
        {
          id: pr.id,
          title: pr.title,
          type: :relevant
        }
      end
    changed_requested=current_user.notification_requested.
      map do |pr|
        {
          id: pr.id,
          title: pr.title,
          type: :requested
        }
      end
    
    resp={
      pending_subordinates: pending_subordinates,
      changed_relevant: changed_relevant,
      changed_requested: changed_requested
    }
    
    set_last_activiy_check
    render json: resp
  end

  
  #TODO: ideiglenesen a devise edit-je helyett
  def change
    if !current_user.valid_password? params[:current_password]
      return render json: {status: :error}
    end
    if params[:new_password].present?
      if params[:new_password]!=params[:new_password_confirmation]
        return render json: {status: :error}
      end
      u=current_user
      current_user.update!(password: params[:new_password],
        password_confirmation: params[:new_password_confirmation])
      sign_in(u, bypass: true)
    end
    
    current_user.update!(first_name: params[:first_name], last_name: params[:last_name],
      godfather_id: params[:godfather_id], receive_email: params[:receive_email])
    render json: {status: :ok}
  end
  
  def upload_cv
    begin
      current_user.cv=params[:cv]
      current_user.save!
    rescue =>e
      return render json: {status: :error}
    end
    render json: {status: :ok}
  end
  
  def notify_seen_by_godfather
    if current_user.has_role?(:godfather) && @user.godfather_id==current_user.id
      @user.update!(last_seen_by_godfather: Time.now)
      render json: {status: :ok}
    else 
      render json: {status: :error}
    end
  end
  
  def notify_seen_relevant
    current_user.update!(last_seen_relevant: Time.now)
    render json: {status: :ok}
  end
  
  def notify_seen_requested
    current_user.update!(last_seen_requested: Time.now)
    render json: {status: :ok}
  end
  
  def stats
    work_places=(ENV['WORK_PLACES'] || '').split(",")
    
    workers={}
    work_places.each do |wp|
      #binding.pry
      comp=Competence.find_by title: wp
      workers[wp]=AssignedCompetenceLevel.where(competence_id: comp.id).count if comp
    end
    
    user_count=User.count
    with_assigned=AssignedCompetenceLevel.all.map{|u| u.user_id}.uniq.count
    with_pending=PendingCompetenceLevel.all.map{|u| u.user_id}.uniq.count
    availability_count=Availability.count
    person_request_count=PersonRequest.count
    
    render json: {
      user_count: user_count,
      availability_count: availability_count,
      with_assigned: with_assigned,
      with_pending: with_pending,
      workers: workers,
      person_request_count: person_request_count
    }
  end
  
  private
    def set_user
      @user=User.find(params[:id])
    end
    
    def set_last_activiy_check
      $redis.set("kompetencia:user:last_activity_check:#{current_user.id}", Time.new)
    end
end
