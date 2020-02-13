class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.references :user, null: false, foreign_key: true
      t.string :asin
      t.string :image
      t.string :title
      t.integer :sellers
      t.integer :stars
      t.integer :ratings

      t.timestamps
    end
  end
end
