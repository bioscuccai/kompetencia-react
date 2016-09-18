module CompetenceMatrix
  def self.process_matrix opts={}
    competence_types=opts[:competences].map{|c| c&.competence_type}.compact.uniq
    subordinate_ids=User.where(godfather_id: opts[:user].id).map(&:id)

    ct_resp=competence_types.map do |ct|
      ct_competences=opts[:competences].select{|c| c.competence_type_id==ct.id}
      {
        id: ct.id,
        competence_type: ct.title,
        tiers: ct&.competence_tier_group&.competence_tiers.map do |cti|
          {
            title: cti.title,
            level: cti.level
          }
        end,
        competences: ct_competences.map do |c|
          {
            id: c.id,
            title: c.title,
            levels: (0...c&.competence_type&.competence_tier_group&.competence_tiers.count).map do |l|
              if opts[:only_subordinates]
                {
                  assigned: AssignedCompetenceLevel.where(level: l, competence_id: c.id, user_id: subordinate_ids).count,
                  pending:  PendingCompetenceLevel.where(level: l, competence_id: c.id, user_id: subordinate_ids).count
                }
              else
                {
                  assigned: AssignedCompetenceLevel.where(level: l, competence_id: c.id).count,
                  pending:  PendingCompetenceLevel.where(level: l, competence_id: c.id).count
                }
              end
            end
          }
        end
      }
    end
  end
end
