class CreateBuyBoxes < ActiveRecord::Migration[6.0]
  def change
    create_table :buy_boxes do |t|
      t.string :seller
      t.string :price
      t.string :available

      t.references :product_asin, references: :products, null: false

      t.timestamps
    end
    rename_column :buy_boxes, :product_asin_id, :product_asin
    add_foreign_key :buy_boxes, :products, column: 'product_asin', primary_key: 'asin'
    change_column :buy_boxes, :product_asin, :string
  end
end
