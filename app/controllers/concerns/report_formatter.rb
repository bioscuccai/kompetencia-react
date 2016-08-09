module ReportFormatter
  extend ActiveSupport::Concern
  include CompetenceFormatter
  
  def format_report report
    {
      id: report.id,
      name: report.name,
      unpublished: report.unpublished,
      saved_queries: report.saved_queries.map do |sq|
        {
          id: sq.id,
          name: sq.name,
          match_all: sq.match_all,
          show_pending: sq.show_pending,
          only_subordinates: sq.only_subordinates,
          competences: format_competence_list(sq.saved_query_competences),
          user_id: sq.user_id
        }
      end
    }
  end
end
