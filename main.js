// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

/**************************************************** */
const  fs =require('fs');
//const readLine =require('readLine');
const {google} =require ('googleapis');
/***************************************************** */
const  KEYFILEPATH = ['C:\\Youtube\\dev\\ServiceAccountCreed.json'];
const SCOPES = 'https://www.googleapis.com/auth/drive';
const auth =new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
})
async function createAndUploadFile(auth){
const driveService = google.drive({version: 'v3',auth});

let fileMetadata={
  'name' : 'icon.png',
  'parents' :['1BLX0Et1TIkaz8ttYOlt8e270d2vFgx3R']
}
let media ={
  mimeType: 'image/png',
  body : fs.createReadStream('icon.png')
}

let respense =await driveService.files.create({
  resource : fileMetadata,
  media : media,
  fields : 'id'
})

switch(respense.status){
case 200:
  console.log('creation', respense.data.id);
  break;
}

}


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
