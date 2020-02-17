class BuyBox < ApplicationRecord
  validates_presence_of :product_asin, :seller, :available, :price
  belongs_to :product, foreign_key: 'product_asin'

  def before_save
    self.product_asin  = self.product_asin.upcase!
  end
end
