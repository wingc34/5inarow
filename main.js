// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')
const path = require('path');
let isPVP;

// Enable live reload for all the files inside your project directory
require('electron-reload')("../5inarow");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // let options  = {
  //   type: "warning",
  //   buttons: ["PVP", "PVE"],
  //   message: "Which mode you want to play?",
  //  }

  // dialog.showMessageBox(options, (res) => {
  //   console.log(res)
    
  //   if(res === 0){
  //     //PVP button pressed
  //     isPVP = true;
  //     global.isPVP = true;
  //   }
  //   else if(res === 1){
  //     //PVE button pressed
  //     global.isPVP = false;
  //     return;
  //   }
    
    
  //   //console.log(checkboxChecked) //true or false
  //  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  // mainWindow.on('closed', function () {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   mainWindow = null;
  // })

  //Listen close event to show dialog message box
  mainWindow.on('close', (event) => {
    //Cancel the current event to prevent window from closing
    event.preventDefault();

    let options  = {
      type: "warning",
      buttons: ["Yes", "No"],
      message: "Do you really want to quit?",
      fullscreen: true
     }

     dialog.showMessageBox(mainWindow, options, (res) => {
      console.log(res)
      
      if(res === 0){
      //   //Yes button pressed
        mainWindow.destroy();
      }
      else if(res === 1){
        //No button pressed
        return;
      }
      
      
      //console.log(checkboxChecked) //true or false
     })
  })
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
