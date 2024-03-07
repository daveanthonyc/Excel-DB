# Excel as a data base

Here I am experimenting with the use of excel as a database, and using google's APIs to make queries to it. 
The reason why I am doing this is not out of novelty, but in an organisation that heavily uses excel reporting, I thought it would be a cool idea to create data visualisers that pull data from the google sheets that is regularly edited. Maybe even using google form to input data into the excel data base and then a website can call APIs to the google sheets to present the data in a dashboard of some sort.

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
