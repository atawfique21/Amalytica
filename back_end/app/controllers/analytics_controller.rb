class AnalyticsController < ApplicationController
    before_action :set_analytic, only: [:show]
    before_action :set_product, only: [:show, :index]
    skip_before_action :authorize_request, only: [:create, :show]

    # GET /analytics
    def index
      @analytics = Analytic.all
      json_response(@analytics)
    end

    # POST /analytics
    def create
      Analytic.create!(analytic_params)
      json_response(analytic_params, :created)
    end

    # GET /analytics/:asin
    def show
      @analytic = Analytic.where(product_asin: params[:asin])
      json_response(@analytic)
    end
    private

    def analytic_params
      params.permit(
          :product_asin,
          :seller,
          :condition,
          :available,
          :price
      )
    end

    def set_analytic
      @analytic = Analytic.find_by_product_asin(params[:asin])
    end

    def set_product
      @product = Product.find_by_asin(params[:asin])
    end
end
