class ProductsController < ApplicationController
  # POST /products
  # return asin, image and product title as response.
  before_action :set_user, only: [:create, :index]
  before_action :set_product, only: [:show]
  skip_before_action :authorize_request, only: :create

  # GET /products
  def index
    @products = @user.products
    json_response(@products)
  end

  def create
    Product.create!(product_params)
    json_response(@product, :created)
  end

  # GET /products/:id
  def show
    json_response(@product)
  end

  private

  def product_params
    params.permit(
        :asin,
        :image,
        :title,
        :user_id
    )
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end