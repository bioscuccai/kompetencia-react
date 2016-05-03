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
  return actor.is_godfather && subject.godfather_id!==actor.id;
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

export default {
  canDeleteCompetenceOf,
  canAcceptCompetenceOf,
  canSolicitCompetenceOf,
  canAlterCompetenceOf,
  
  canAlterAvailabilityOf,
  
  canRequestUsers,
  canRequestUser,
  
  canAlterCompetences,
  
  canAlterRoles,
  canManageUsers,
  canSearch
};
