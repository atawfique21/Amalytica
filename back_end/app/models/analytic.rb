class Analytic < ApplicationRecord
  validates_presence_of :price, :available, :condition, :seller, :product_asin
  belongs_to :product, foreign_key: 'product_asin'

  def before_save
    self.product_asin  = self.product_asin.upcase!
  end
end
