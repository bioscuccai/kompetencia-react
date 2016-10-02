module CompetenceFormatter
  extend ActiveSupport::Concern
  
  def format_competence_list query, level_names=nil, hsh={}
    level_names||=CompetenceTier.tier_names
    wo=hsh[:wo] || []
    formatted=query.map do |assigned|
      comp={
        id:    assigned.competence.id,
        level: assigned.level,
        title: assigned.competence.title,
        type:  assigned.competence&.competence_type&.title,
        level_title: level_names[assigned.competence.competence_type.competence_tier_group_id][assigned.level]
      }
      if !wo.include? :meta
        comp.merge!({
          description: assigned&.competence&.competence_type&.description,
          competence_type_priority: assigned.competence&.competence_type&.priority,
          competence_type_show_title: assigned.competence&.competence_type&.show_title
        })
      end
      comp
    end
    formatted
  end
end
