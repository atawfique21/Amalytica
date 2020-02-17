class Product < ApplicationRecord
  self.primary_key = 'asin'
  belongs_to :user
  has_many :analytics, primary_key: 'asin', foreign_key: 'product_asin'
  has_many :buy_boxes, primary_key: 'asin', foreign_key: 'product_asin'

  validates_uniqueness_of :asin
  validates_presence_of :asin, :image, :title, :price, :user_id

  before_save :before_save

  def before_save
    self.asin  = self.asin.upcase!
  end

end
