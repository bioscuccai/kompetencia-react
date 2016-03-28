module CompetenceFormatter
  extend ActiveSupport::Concern
  
  def format_competence_list query
    formatted=query.includes(competence: [:competence_type]).map do |assigned|
      {
        id:    assigned.competence.id,
        level: assigned.level,
        title: assigned.competence.title,
        type:  assigned.competence&.competence_type&.title
      }
    end
    formatted
  end
end
