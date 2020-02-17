class ChangeAsinColumnBackInProducts < ActiveRecord::Migration[6.0]
  def change
    change_column :products, :asin, :string, :null => false
  end
end
