class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  
  include RestrictAccess
  include PostFormatter
  
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :restrict_admin, only: [:update, :edit, :delete, :create]
  
  # GET /posts
  # GET /posts.json
  def index
    if current_user.has_role? :admin
      @posts = Post.order(created_at: :desc)
    else
      @posts = Post.where(published: true).order(created_at: :desc)
    end
    render json: @posts.map{|p| format_post(p)}
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    respond_to do |format|
      format.html do
        markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
        @short_text=markdown.render @post.short_text
        @text=markdown.render @post.text
      end
      format.json {render json: format_post(@post)}
    end
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @post.user_id=current_user.id
    @post.save!
    render json: {status: :ok}
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    @post.update!(post_params)
    render json: {status: :ok}
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy!
    render json: {status: :ok}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :short_text, :text, :published, :front_page, :important, :user_id)
    end
end
