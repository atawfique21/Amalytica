class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products, id: false do |t|
      t.references :user, null: false, foreign_key: true
      t.primary_key :asin
      t.string :image
      t.string :price
      t.string :title

      t.timestamps
    end

  end
end
