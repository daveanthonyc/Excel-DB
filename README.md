# Excel as a data base

This is a React/TypeScript project that is used as a proof of concept that you can use Google Sheets as a database and make queries to it to use the data for a dashboard UI. 
the @Nivo/pie chart was used along with Material UI for the dashboard components.
The reason why I am doing this is not out of novelty, but in an organisation that heavily uses excel reporting, I thought it would be a cool idea to create data visualisers that pull data from the google sheets that are regularly edited. 

Another continuation of this idea is that you could even use google form as a user friendly interface to input data into the excel data base. 

It is based on this [YouTube Short](https://www.youtube.com/shorts/zkrVpleJIeI)

I have summarised the steps below.

## How to create Google Sheets as a Database 
1. Go to Google Sheets and create a new blank sheet
2. Add some data
3. Click on "Extensions" dropdown and click on "Apps Script". This will take you to a new window the interface to add in JavaScript for Apps Script  
4. Copy paste the following code into the coding interface:
```
const doc = SpreadsheetApp.getActiveSpreadsheet();
let sheet = doc.getSheetByName("Sheet1");
let value = sheet.getDataRange().getValues().slice(1)

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({data: value})).setMimeType(ContentService.MimeType.JSON)
}
```
5. Click on "Deploy" drop down and click "New deployment"
6. Add a description, Execute as "Me" and have "Only myself" for who can access the app  
7. Click "Deploy"
8. Copy the "Web app" URL. This is the URL that you use to make fetch requests and receive the data as specified in our Apps Script code.
9. Lastly, integrate into frontend by making a call using this Web app URL. E.g "const res = await fetch(*Web-app-url*)"

# Installation
1. `git clone git@github.com:daveanthonyc/Excel-DB.git`
2. `cd Excel-DB`
3. `npm install`
4. Create .env file and create a variable named: VITE_GOOGLE_SHEET_WEB_APP_URL="**Your Web app URL from beforehand**"
