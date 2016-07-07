module ReportFormatter
  extend ActiveSupport::Concern
  include CompetenceFormatter
  
  def format_report report
    {
      id: report.id,
      name: report.name,
      saved_queries: report.saved_queries.map do |sq|
        {
          id: sq.id,
          name: sq.name,
          competences: format_competence_list(sq.saved_query_competences)
        }
      end
    }
  end
end
