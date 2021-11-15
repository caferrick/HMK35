const { app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

// Enable live reload for Electron too
//require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
// electron: require(`${__dirname}/node_modules/electron`)
//});

let appWindow

function initWindow() {
  appWindow = new BrowserWindow({
    width: 900,
    height: 1100,
    webPreferences: {
      nodeIntegration: true,
      devTools: true

    }
  })

  // Electron Build Path
  appWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Initialize the DevTools.
  appWindow.webContents.openDevTools()

  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('ready', initWindow)



// Close when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    initWindow()
  }
})
