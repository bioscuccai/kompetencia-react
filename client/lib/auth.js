"use strict";

/*
██   ██  ██████  ███    ███ ██████  ███████ ████████ ███████ ███    ██  ██████ ██  █████  
██  ██  ██    ██ ████  ████ ██   ██ ██         ██    ██      ████   ██ ██      ██ ██   ██ 
█████   ██    ██ ██ ████ ██ ██████  █████      ██    █████   ██ ██  ██ ██      ██ ███████ 
██  ██  ██    ██ ██  ██  ██ ██      ██         ██    ██      ██  ██ ██ ██      ██ ██   ██ 
██   ██  ██████  ██      ██ ██      ███████    ██    ███████ ██   ████  ██████ ██ ██   ██ 
*/

//torles
function canDeleteCompetenceOf(subject, actor){
  if(actor.is_admin){
    return true;
  }
  if(actor.is_godfather && subject.id===actor.id){
    return true;
  }
  if(actor.is_godfather && subject.godfather_id===actor.id){
    return true;
  }
  return false;
}

//elfogad/visszautasit
function canAcceptCompetenceOf(subject, actor){
  if(actor.is_admin){
    return true;
  }
  if(actor.is_godfather && subject.id===actor.id){
    return true;
  }
  if(actor.is_godfather && subject.godfather_id===actor.id){
    return true;
  }
  return false;
}

//kervenyez
function canSolicitCompetenceOf(subject, actor){
  if(subject.id===actor.id){
    return true;
  }
  return false;
}

//azonnal modosit
function canAlterCompetenceOf(subject, actor){
  if(actor.is_admin){
    return true;
  }
  if(actor.is_godfather && subject.id===actor.id){
    return true;
  }
  if(actor.is_godfather && subject.godfather_id===actor.id){
    return true;
  }
  return false;
}
/*
███████ ██      ███████ ██████  ██   ██ ███████ ████████  ██████  ███████ ███████  ██████  
██      ██      ██      ██   ██ ██   ██ ██         ██    ██    ██ ██      ██      ██       
█████   ██      █████   ██████  ███████ █████      ██    ██    ██ ███████ █████   ██   ███ 
██      ██      ██      ██   ██ ██   ██ ██         ██    ██    ██      ██ ██      ██    ██ 
███████ ███████ ███████ ██   ██ ██   ██ ███████    ██     ██████  ███████ ███████  ██████  
*/
function canAlterAvailabilityOf(subject, actor){
  if(actor.is_admin){
    return true;
  }
  if(actor.is_godfather && subject.godfather_id===actor.id){
    return true;
  }
  if(actor.is_godfather && subject.id===actor.id){
    return true;
  }
  return false;
}

function canSeeAvailabilities(actor){
  return actor.is_admin || actor.is_godfather;
}

/*
██   ██ ██ ██████  ██████  ███████ ████████ ███████ ███████ 
██   ██ ██ ██   ██ ██   ██ ██         ██    ██      ██      
███████ ██ ██████  ██   ██ █████      ██    █████   ███████ 
██   ██ ██ ██   ██ ██   ██ ██         ██    ██           ██ 
██   ██ ██ ██   ██ ██████  ███████    ██    ███████ ███████ 
*/

function canRequestUsers(actor){
  return (actor.is_admin || actor.is_godfather);
}

function canRequestUser(subject, actor){
  return actor.is_godfather && subject.godfather_id!==actor.id && subject.id!==actor.id;
}

/*
██    ██  █████  ██       █████  ███████ ███████  ██████  ██   ██ 
██    ██ ██   ██ ██      ██   ██ ██         ███  ██    ██ ██  ██  
██    ██ ███████ ██      ███████ ███████   ███   ██    ██ █████   
 ██  ██  ██   ██ ██      ██   ██      ██  ███    ██    ██ ██  ██  
  ████   ██   ██ ███████ ██   ██ ███████ ███████  ██████  ██   ██ 
*/

function canAlterCompetences(actor){
  return actor.is_admin;
}

/*
███████ ███████ ██      ██   ██  █████  ███████ ███████ ███    ██  █████  ██       ██████  ██   ██ 
██      ██      ██      ██   ██ ██   ██ ██         ███  ████   ██ ██   ██ ██      ██    ██ ██  ██  
█████   █████   ██      ███████ ███████ ███████   ███   ██ ██  ██ ███████ ██      ██    ██ █████   
██      ██      ██      ██   ██ ██   ██      ██  ███    ██  ██ ██ ██   ██ ██      ██    ██ ██  ██  
██      ███████ ███████ ██   ██ ██   ██ ███████ ███████ ██   ████ ██   ██ ███████  ██████  ██   ██ 
*/
function canAlterRoles(actor){
  return actor.is_admin;
}

function canManageUsers(actor){
  return actor.is_admin;
}

function canSearch(actor){
  return actor.is_admin || actor.is_godfather;
}

/*
███████ ██   ██ ██ ██      ██      
██      ██  ██  ██ ██      ██      
███████ █████   ██ ██      ██      
     ██ ██  ██  ██ ██      ██      
███████ ██   ██ ██ ███████ ███████ 
*/
function canAddUserSkill(subject, actor){
  if(actor.admin) return true;
  if(actor.is_godfather && subject.godfather_id===actor.godfather_id) return true;
  return false;
}

function canRemoveUserSkill(subject, actor){
  if(actor.id_admin) return true;
  if(subject.id===actor.id) return true;
  if(actor.is_godfather===actor.godfather_id) return true;
  return false;
}

function canSolicitUserSkill(subject, actor){
  if(subject.id===actor.id) return true;
  return false;
}

function canConfirmUserSkill(subject, actor){
  if(actor.is_admin) return true;
  if(actor.is_godfather && subject.godfather_id===actor.id) return true;
  return false;
}

export default {
  canDeleteCompetenceOf,
  canAcceptCompetenceOf,
  canSolicitCompetenceOf,
  canAlterCompetenceOf,
  
  canAlterAvailabilityOf,
  canSeeAvailabilities,
  
  canRequestUsers,
  canRequestUser,
  
  canAlterCompetences,
  
  canAlterRoles,
  canManageUsers,
  canSearch,
  
  canConfirmUserSkill,
  canSolicitUserSkill,
  canAddUserSkill,
  canRemoveUserSkill
};
