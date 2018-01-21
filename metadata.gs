

var staffChecklistId = "1pIXC9_202q1gl6InGSDpfrXaddvjG4Or0El1eYwW7CM";
var signinFormId = "1mxt8N1dVohK5alXzmTxQKnzOTioz_dwyxbc2MSgDwBU";
var iHelpedSomeoneId = "120F1E_ckvxBWKPNHS9Ia9mXSdRuefnEasR7zKqT1dSk";
var meritBadgeIconListId= "10Whhc_Ps_G7z5IqOHXezTQNdDPON6fNiC0i-VrgHKXc";

var meritBadgeIconList = SpreadsheetApp
        .openById(meritBadgeIconListId);

var staffChecklist = SpreadsheetApp
        .openById(staffChecklistId);

var signIn = SpreadsheetApp
        .openById(signinFormId);

var iHelpedSomeone = SpreadsheetApp
        .openById(iHelpedSomeoneId);


// lists of things:

var openHouse = {
  "Monday" : {
    open : "12:00",
    close : "17:00",
  },
  "Tuesday" : {
    open : "17:00",
    close : "20:00",
  },
  "Wednesday" : {
    open : "17:00",
    close : "20:00",
  },
  "Thursday" : {
    open : "17:00",
    close : "20:00",
  },
  "Friday" : {
    open : "12:00",
    close : "17:00",
  },
  "Saturday" : {
    open : "12:00",
    close : "17:00",
  }
};

var MeritBadges = [
  'Laser Cutter',
  '3D Printing',	
  'Hand Tools',	
  'HandiBot',	
  'Power Tools',
  'Print Shop',	
  'Sewing Machine',
  'Embroidery Machine',	
  'Vinyl Cutter',
  'FormLabs',	
  'Soldering',
  'Arduino',
  'Button Maker',
  'Raspberry Pi'
];


var equipmentList = {
  "FDM 3D Printer" : {
    runsAfterHourse : true,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "3D Printing",
    items : {
        "MakerBot 1" : {},
        "MakerBot 2" : {},
        "Ultimaker 2+" : {},
        "Taz 6 FlexyDually" : {},
        "MonoPrice Selecct" : {}        
    }
  },
  "SLA 3D Printer" : {
    runsAfterHourse : true,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "FormLabs",
    items : {
      "Form2 Resin Printer" : {}
    }
  },
  "Vinyl Cutter" : {
    runsAfterHourse : false,
    requiresFullTimeAuthorizedUser : false,
    meritBadge : "Vinyl Cutter",
    items : {
      "Silhouette 1" : {},
      "Silhouette 2" : {},
    }
  },
  "Laser Cutter" : {
    requiresFullTimeAuthorizedUser : true,
    runsAfterHourse : false,
    meritBadge : "Laser Cutter",
    requiresFullSupervision : true,
    items : {
      "VLS 4.60 Laser Cutter" : {}
    }
  },
  "Sewing Machine" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Sewing Machine",
    items : {
      "Janome HD 3000" : {}, 
    }    
  },
  "Embroidery Machine" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Embroidery Machine",
    items : {
      "Brother PE-770 Embroidery Machine" : {} 
    }
  },
  "Button Maker" : {
    requiresFullTimeAuthorizedUser : false,
    runsAfterHourse : false,
    meritBadge : "Button Maker",
    items : {
      "1 inch Button Maker" : {}, 
      "1.5 inch Button Maker" : {}, 
      "2.25 inch Button Maker" : {}, 
    }
  }
}

function getEquipmentList(){
 return equipmentList; 
}

function getOpenHours(){
  return openHours; 
}

