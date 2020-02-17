class BuyBox < ApplicationRecord
  validates_presence_of :seller, :available, :price
end
