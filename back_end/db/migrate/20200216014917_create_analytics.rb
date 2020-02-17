class CreateAnalytics < ActiveRecord::Migration[6.0]
  def change
    create_table :analytics do |t|
      t.string :seller
      t.string :condition
      t.string :price
      t.string :available

      t.references :product_asin, references: :products, null: false

      t.timestamps
    end
    rename_column :analytics, :product_asin_id, :product_asin
    add_foreign_key :analytics, :products, column: 'product_asin', primary_key: 'asin'
  end
end
