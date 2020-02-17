class BuyBoxesController < ApplicationController
  before_action :set_buybox, only: [:show]
  skip_before_action :authorize_request, only: [:create, :show]

  # GET /buybox
  def index
    @buyboxes = BuyBox.all
    json_response(@buyboxes)
  end

  # POST /buybox
  def create
    BuyBox.create!(buybox_params)
    json_response(buybox_params, :created)
  end

  # GET /buybox/:asin
  def show
    @buybox = BuyBox.where(product_asin: params[:asin])
    json_response(@buybox)
  end
  private

  def buybox_params
    params.permit(
        :product_asin,
        :seller,
        :available,
        :price
    )
  end

  def set_buybox
    @buybox = BuyBox.find_by_product_asin(params[:asin])
  end
end
