/*
Things to do:
- access logged in user
- create a calendar event
- show a calendar layout that makes sense
- access staff schedules
- access staff merit badges
- know when a calendar event has been deleted?
- find a calendar event matching a description
- find all calender events.
*/

// at link: https://tinyurl.com/gumh-reserve


var currentUser = "";


function doGet(e) {
  Logger.log("opening");  
  parameter = e.parameter;
  var page= e.parameter.page;
  if(!page){
    page = 'index';
  }
     return HtmlService
     .createTemplateFromFile(page)
    // .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
     .evaluate();
}








////  Get Staff Informations
function getStaffChecklist(filter, sort){
  var stafflist = {};
  var allStaffData = staffChecklist
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var checklistData = dataIntoHashRows(allStaffData, 1, 2); //, function(row){ return row['NetId'] == netId;}).data;  
  
  stafflist.checklistData = checklistData;
  
  return stafflist;
}



function getStaffData(netId){
  var staffData = {foo:"va"};

  var allStaffData = staffChecklist
  .getActiveSheet()
  .getDataRange()
  .getValues();
  

  var checklistData = dataIntoHashRows(allStaffData, 1, 2, function(row){
    if(row["NetId"].match(new RegExp(netId, "i"))){
      return true;
    }
    return false;
  }); //, function(row){ return row['NetId'] == netId;}).data;
  checklistData.data = checklistData.data[0];
  
 
   staffData.checklistData = JSON.parse(JSON.stringify(checklistData));
   return staffData;
}



/// Get Merit Badge Information
function getMeritBadgeIconList(filter, sort){

  var allmeritBadgeIconData = meritBadgeIconList
  .getActiveSheet()
  .getDataRange()
  .getValues();
 
  var meritbadgeiconlist = dataIntoHashRows(allmeritBadgeIconData, 0, 1).data; //, function(row){ return row['NetId'] == netId;}).data;  
  var meritBadgeIconHash = {};
  for (var i = 0; i < meritbadgeiconlist.length; i++){
   meritBadgeIconHash[meritbadgeiconlist[i]["Badge Name"]] = meritbadgeiconlist[i];
  }  
  var meritBadgeHash = {};
  for (var j = 0; j < MeritBadges.length; j++){
    if(meritBadgeIconHash[MeritBadges[j]]){
      meritBadgeHash[MeritBadges[j]] = meritBadgeIconHash[MeritBadges[j]];
    }else{
      meritBadgeHash[MeritBadges[j]] = {};
    }
  }
  return meritBadgeHash;
}




////// clever bits for scheduling

// get all staff available for a particular set of merit badges, within a date range, along with their schedules

// get schedule for a staff person between a date range
function organizeStaffByMeritBadges(startDate, endDate){
  var meritBadgeStaff = {};

  if(!startDate){
   startDate= "Wed Oct 25 2017 00:00:00 GMT-0400"; 
  }
  if(!endDate){
   endDate =  "Thu Oct 26 2017 00:00:00 GMT-0400";
    
  }
  
  staffSchedules = getStaffSchedules(startDate, endDate);
  
  //return JSON.parse(JSON.stringify(staffSchedules));
  var emails = Object.keys(staffSchedules);
  Logger.log("working on it");
  for(var i = 0; i< emails.length ; i++){
    var netid = emails[i].split("@")[0];
    var staffInfo = getStaffData(netid);
    for(var j = 0 ; j< MeritBadges.length; j++){
      var mb = MeritBadges[j];
      if(!meritBadgeStaff[mb]){
        meritBadgeStaff[mb] = {}; 
      }
      if(staffInfo.checklistData.data[mb]){
        if(!meritBadgeStaff[mb][netid]){
          meritBadgeStaff[mb][netid] = {};
        }
        meritBadgeStaff[mb][netid].data = staffInfo.checklistData.data;
        meritBadgeStaff[mb][netid].schedule = staffSchedules[emails[i]];
           
      }
    }
  }
  return JSON.parse(JSON.stringify(meritBadgeStaff));
}






/////////////// get equipment and merit badge information



