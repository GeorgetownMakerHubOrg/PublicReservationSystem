
// calendar stuff
function getOverlappingEquipmentReservations(equipmentName, startDate, endDate){
  cal = getReservationCal();
  var filterFunction = function(event){
    if(event.getDescription.match(equipmentName)){
      return true; 
    }
  }
  return getOverlappingEvents(cal, startDate, endDate, filterFunction); 
}

function createReservationEvent(startTime, endTime, title, description, guests){
  var cal = getReservationCal();
  return createCalEvent(cal, startTime, endTime, title, description, guests);
}

function createStaffConsultationEvent(startTime, endTime, title, description, guests){
  var cal = getStaffConsultationCal();
  return createCalEvent(cal, startTime, endTime, title, description, guests);
}


// Get Events
function getEquipmentReservationEvents(startTime, endTime){
  var cal = getReservationCal();
  return getCalEvents(cal, startTime, endTime);
}

function getStaffScheduleEvents(startTime, endTime){
  var cal = getStaffScheduleCal();
  return getCalEvents(cal, startTime, endTime);  
}

function getStaffConsultationEvents(startTime, endTime){
  var cal = getStaffConsultationCal();
  return getCalEvents(cal, startTime, endTime);    
}






///// Get Current User informations
function getNetId() {
  var email = Session.getActiveUser().getEmail();
  Logger.log(email);
  var user = "";
  if(email.trim() != ""){
    user = email.split("@")[0];
  }
  return user;
}


// get information about the user (volunteer/staff/visitor, authorizations, etc)
function getUserTableDataFromNetId(netId){
  var userTableData = userTable
  .getActiveSheet()
  .getDataRange()
  .getValues();

  var userData = dataIntoHashRows(userTableData, 0, 1, function(row){
    if(row["netid"].toString().trim() == netId.toString().trim()){
      return true;
    }
    return false;
  }); //, function(row){ return row['NetId'] == netId;}).data;
  
  if(userData.data.length > 0){
    return userData.data[0];
  }
  return false;
}
