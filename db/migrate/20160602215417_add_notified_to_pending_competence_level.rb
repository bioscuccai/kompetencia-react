class AddNotifiedToPendingCompetenceLevel < ActiveRecord::Migration
  def change
    add_column :pending_competence_levels, :notified, :boolean, null: false, default: false
  end
end
