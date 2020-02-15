class Product < ApplicationRecord
  belongs_to :user
  validates_uniqueness_of :asin
  validates_presence_of :asin, :image, :title, :price
  before_save :before_save

  def before_save
    self.asin  = self.asin.upcase!
  end
end
