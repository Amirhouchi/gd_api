/**************************************************** */
// const { log } = require('console');
const  fs =require('fs');
//const readLine =require('readLine');
const { google } =require ('googleapis');
const path = require('path');
const CLIENT_ID = ''
const CLIENT_SECRET = '';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN ='';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

const filePath = path.join(__dirname, 'icon.zip')

async function uploadFile() {
  try {

    const response =await drive.files.create({
      requestBody: {
        name: 'icon.png',
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(filePath)
      }
    })

    console.log(response.data)
  } catch(error){
    console.log(error.message)
  }
}


async function deleteFile() {
try {
  const response = await drive.files.delete({
    fileId: '1C8TirolmIp1-PVsHsO1p1McqCzJM3OJW',
  });
  console.log(response.data, response.status);
} catch (error){
  console.log(error.message);
}
}



async function generatePublicUrl() {
  try {
    const fileId = '1_QkmobcOjxQPDuJqCUPXslG0C_yk3A6H';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error){
    console.log(error.message)
  }
}


//creation un dossier :
 async function create_file() {
    var fileMetadata = {
      'name': 'FileTest',
      'mimeType': 'application/vnd.google-apps.folder'
    };
    drive.files.create({
      resource: fileMetadata,
      fields: '01'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('Folder Id: ', file.id);
      }
    });
    
  }
  
 /* async function racour(){
    var fileMetadata = {
      'name': 'Project plan',
      'mimeType': 'image/png'
    };
    drive.files.create({
      resource: fileMetadata,
      fields: '1cbMXSqFrZSX95S_7jP_keWFxBwV9AvOf'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
      }
    });
  }
  */
//uploadFile();
//deleteFile();
generatePublicUrl()
//create_file();



//racour()
