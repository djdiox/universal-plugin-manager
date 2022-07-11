const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()
// If we have any open windows, especially on debug
if (!gotTheLock) {
// we gonna quit the app
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log('detected second instance', event, commandLine, workingDirectory)
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
    myWindow = require('../renderer/mainWindow').default
  })
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })
}
