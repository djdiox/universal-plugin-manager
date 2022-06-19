import BrowserWinHandler from './BrowserWinHandler'
import {dialog} from 'electron';
const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

winHandler.onCreated(_browserWindow => {
  _browserWindow.on('showDialog', (event) => {
dialog.showErrorBox('bla', 'blubb')
  })
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
