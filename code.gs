const sheetName = 'Results'
const scriptProp = PropertiesService.getScriptProperties()

function intialSetup (){
   const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
   scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
  var y = x.evaluate();
  var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return z;
}

function doPost (e){
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    }) 

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService.createTextOutput(JSON.stringify({ 'result' : 'success', 'row' : nextRow })).setMimeType(ContentService.MimeType.JSON)
  }

  catch(e) {
    return ContentService.createTextOutput(JSON.stringify({'result' : 'error' , 'error': e})).setMimeType(ContentService.MimeType.JSON)
  }

  finally{
    lock.releaseLock()
  }
}


function checkLogin(username, password) {
  var url = 'https://docs.google.com/spreadsheets/d/1pi8PgRaXhgjPWlTRqxI0zquxvuiBKo8u6ueNfJk5X5w/edit?gid=0#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  var getLastRow =  webAppSheet.getLastRow();
  var found_record = '';
  for(var i = 1; i <= getLastRow; i++)
  {
   if(webAppSheet.getRange(i, 1).getValue().toUpperCase() == username.toUpperCase() && 
     webAppSheet.getRange(i, 2).getValue().toUpperCase() == password.toUpperCase())
   {
     found_record = 'TRUE';
   }    
  }
  if(found_record == '')
  {
    found_record = 'FALSE'; 
  }
  
  return found_record;
  
}

function AddRecord(usernamee, passwordd, email, phone) {
  var url = 'https://docs.google.com/spreadsheets/d/1pi8PgRaXhgjPWlTRqxI0zquxvuiBKo8u6ueNfJk5X5w/edit?gid=0#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  webAppSheet.appendRow([usernamee,passwordd,email,phone]);
  
}


function AddRecord2(ID, Player, Result ) {
  var url = 'https://docs.google.com/spreadsheets/d/1pi8PgRaXhgjPWlTRqxI0zquxvuiBKo8u6ueNfJk5X5w/edit?gid=297667961#gid=297667961';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Results");
  webAppSheet.appendRow([ID,Player,Result]);
  
}

