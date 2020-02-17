class AddAsinColumnToAnalytics < ActiveRecord::Migration[6.0]
  def change
    add_column :analytics, :asin, :string
  end
end
