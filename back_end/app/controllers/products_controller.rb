class ProductsController < ApplicationController
  # POST /products
  # return asin, image and product title as response.
  before_action :set_user, only: [:create, :index]
  before_action :set_product, only: [:show]


  # GET /products
  def index
    @products = @user.products
    json_response(@products)
  end

  def create
    @product = @user.products.create!(product_params)
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
    puts(params[:user_id])
    @user = User.find_by_id(params[:user_id])
  end
end
