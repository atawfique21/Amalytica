class ChangeAsinColumnToStringInProductExample < ActiveRecord::Migration[6.0]
  def change
    change_column :product_examples, :asin, :string
  end
end
