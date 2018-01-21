var reservationCalName = "Georgetown Maker Hub Equipment Reservations";
var reservationCal = false;
var staffScheduleCalName = "Maker Hub Staff and Volunteer Schedule";
var staffScheduleCal = false;
var staffConsultationCalName = "Georgetown Maker Hub Staff Consultation Calendar";
var staffConsultationCal = false;


// get Calendars 
function getReservationCal(){
  if(!reservationCal){
    var calendars = CalendarApp.getCalendarsByName(reservationCalName);
    reservationCal = calendars[0];
  }
  return reservationCal;
}

function getStaffScheduleCal(){
  if(!staffScheduleCal){
    var calendars = CalendarApp.getCalendarsByName(staffScheduleCalName);
    staffScheduleCal = calendars[0];
  }
  return staffScheduleCal;
}


function getStaffConsultationCal(){
  //staffConsultationCalName
  if(!staffConsultationCal){
    var calendars = CalendarApp.getCalendarsByName(staffConsultationCalName);
    staffConsultationCal = calendars[0];
  }
  return staffConsultationCal;
}
/////////////////////////


function getStaffSchedules(startDate, endDate){

  var staffCal = getStaffScheduleCal();
  var staffSchedules = {};
  
  var now = new Date();
  var startDateTime = new Date(startDate);
  var endDateTime = new Date(endDate);
  var events = staffCal.getEvents(startDateTime, endDateTime);  
  
  for(var i = 0; i < events.length; i++){
    var guests = events[i].getGuestList(true);
    for(var j = 0; j < guests.length; j++){
      var guest = guests[j];
      var email  = guest.getEmail().toLowerCase();
      var eventDetails = {title: events[i].getTitle(),
                          startTime: events[i].getStartTime(),
                          endTime: events[i].getEndTime(),
                          guestList : events[i].getGuestList(),
                          staffEmail : events[i].getGuestList()[0].toString(),
                          id : events[i].getId()
                         };
      if(!staffSchedules[email]){
        staffSchedules[email] = [];
      }
      staffSchedules[email].push(eventDetails);
    }    
  }
  return JSON.parse(JSON.stringify(staffSchedules));
}






function getCalEvents(cal, startTime, endTime){
  var realStartDate = new Date(startTime);
  var realEndDate = new Date(endTime);
  try{
    var events = cal.getEvents(new Date(startTime), new Date(endTime));
    var returnEvents = events.map(function(event){
      Logger.log(JSON.stringify(event));
      var returnEvent = {
        id: event.getId(),
        calendarName : cal.getName(),
        startTime: event.getStartTime().toString(),
        endTime : event.getEndTime().toString(),
        title : event.getTitle(),
        description : event.getDescription(),
        guestList : event.getGuestList(true).map(function(guest){
          return {name : guest.getName(),
                  email : guest.getEmail(),
                  status: guest.getGuestStatus()
                 };
        }),
        creators : event.getCreators(),
        dateCreated : event.getDateCreated.toString(),
        location : event.getLocation()
      }
      return returnEvent;
    });
    return returnEvents;
  }catch (error){
    Logger.log(error);
    throw error; 
  }
}




function getOverlappingEvents(cal, startDate, endDate, filterFunction){
  // find out if there are events that match the matchFunction, and also overlap the range between startDate and EndDate 
  if(!cal){
    cal = getStaffScheduleCal();
    startDate = new Date("January 20, 2018, 16:30 ");
    endDate = new Date("January 20, 2018, 17:00 "); 
    filterFunction = function(event){
      if(event.getTitle().match(/sarah/i)){
        return true; 
      }
    }
  }
  var events = cal.getEvents(startDate, endDate);
  Logger.log(events);
  var newEvents = events;
  if(filterFunction){
    newEvents = events.filter(filterFunction);
  }
  Logger.log(newEvents);
  return JSON.parse(JSON.stringify(newEvents));
}


/////////////////////





/// Create Events
function createCalEvent(cal, startTime, endTime, title, description, guests){
   
  var guestlist = "";
  if(guests){
    var guestEmails = guests.map(function(g){
      if(g.indexOf("@") < 0){
        return g+"@georgetown.edu";
      }
    });
    guestlist = guestEmails.join(",");
  }
  
  var options = {
    location: "Maker Hub",
    description: description,
    guests : guestlist
  };
  
  var startDate = new Date(startTime);
  var endDate = new Date(endTime);  
  var event = cal.createEvent(title, new Date(startTime), new Date(endTime), options)

  var returnEvent = {
        id: event.getId(),
        startTime: event.getStartTime().toString(),
        endTime : event.getEndTime().toString(),
        title : event.getTitle(),
        description : event.getDescription(),
        guestList : event.getGuestList(true).map(function(guest){
          return {name : guest.getName(),
                  email : guest.getEmail(),
                  status: guest.getGuestStatus()
                 };
        }),
        creators : event.getCreators(),
        dateCreated : event.getDateCreated.toString(),
        location : event.getLocation()
      }
  return returnEvent;
}


///////////////////////
