module CompetenceFormatter
  extend ActiveSupport::Concern
  
  def format_competence_list query, level_names=nil
    level_names||=CompetenceTier.tier_names
    formatted=query.includes(competence: [:competence_type]).map do |assigned|
      {
        id:    assigned.competence.id,
        level: assigned.level,
        title: assigned.competence.title,
        type:  assigned.competence&.competence_type&.title,
        competence_type_priority: assigned.competence&.competence_type&.priority,
        competence_type_show_title: assigned.competence&.competence_type&.show_title,
        level_title: level_names[assigned.competence.competence_type.competence_tier_group_id][assigned.level]
      }
    end
    formatted
  end
end
