class Product < ApplicationRecord
  belongs_to :user
  has_many :analytics, foreign_key: :product_asin

  validates_uniqueness_of :asin
  validates_presence_of :asin, :image, :title, :price, :user_id

  before_save :before_save

  def before_save
    self.asin  = self.asin.upcase!
  end

end
