class SavedQuery < ActiveRecord::Base
  has_many :saved_query_competences, dependent: :destroy
  has_many :competences, through: :saved_query_competences
  
  has_many :report_saved_queries, dependent: :destroy
  has_many :reports, through: :report_saved_queries
  
  def competence_query_params
    competence_params=self.saved_query_competences.map do |c|
      {
        'competence_id' => c.competence_id,
        'level' => c.level
      }
    end
    return competence_params
  end
end
