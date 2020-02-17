class RemovePkandAsinFromProducts < ActiveRecord::Migration[6.0]
  def change
    remove_column :products, :asin
    change_column :products, :id, :string
    rename_column :products, :id, :asin
  end
end
