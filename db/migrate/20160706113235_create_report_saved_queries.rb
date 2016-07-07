class CreateReportSavedQueries < ActiveRecord::Migration
  def change
    create_table :report_saved_queries do |t|
      t.integer :report_id, null: false
      t.integer :saved_query_id, null: false

      t.timestamps null: false
    end
  end
end
