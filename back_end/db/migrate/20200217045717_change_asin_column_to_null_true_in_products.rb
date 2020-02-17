class ChangeAsinColumnToNullTrueInProducts < ActiveRecord::Migration[6.0]
  def change
    change_column :products, :asin, :string, :null => true
  end
end
