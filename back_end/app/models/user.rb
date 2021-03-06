class User < ApplicationRecord
  # encrypt password
  has_secure_password
  # Model associations
  has_many :products, foreign_key: :user_id
  # Validations
  validates_presence_of :name, :username, :password_digest
  validates_uniqueness_of :username
end
