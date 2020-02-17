class Analytic < ApplicationRecord
  validates_presence_of :price, :available, :condition, :seller
end
