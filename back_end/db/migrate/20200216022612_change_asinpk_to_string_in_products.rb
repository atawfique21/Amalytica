class ChangeAsinpkToStringInProducts < ActiveRecord::Migration[6.0]
  def change
    change_column :products, :asin, :string
    change_column :analytics, :product_asin, :string
  end
end
