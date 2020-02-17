# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_17_013725) do

  create_table "analytics", force: :cascade do |t|
    t.string "seller"
    t.string "condition"
    t.string "price"
    t.string "available"
    t.string "product_asin", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_asin"], name: "index_analytics_on_product_asin"
  end

  create_table "buy_boxes", force: :cascade do |t|
    t.string "seller"
    t.string "price"
    t.string "available"
    t.string "product_asin", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_asin"], name: "index_buy_boxes_on_product_asin"
  end

  create_table "products", primary_key: "asin", id: :string, force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "image"
    t.string "price"
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_products_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "analytics", "products", column: "product_asin", primary_key: "asin"
  add_foreign_key "buy_boxes", "products", column: "product_asin", primary_key: "asin"
  add_foreign_key "products", "users"
end
