class FixAsinFk < ActiveRecord::Migration[6.0]
  def change
    remove_column :analytics, :asin
  end
end
