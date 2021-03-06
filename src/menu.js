const electron = require('electron');
const images = require('./images');

const { app } = electron;

function enableCycledEffect(items) {
  const nonEffectMenuOffset = 2
  const selectedIndex = items.findIndex(item => item.checked)
  const nextIndex = selectedIndex + 1 < items.length ? selectedIndex + 1 : nonEffectMenuOffset
  items[nextIndex].checked = true;
}
module.exports = mainWindow => {
  const name = app.getName();
  const template = [
    {
      label: 'Effects',
      submenu: [
        {
          label: 'Cycle',
          accelerator: 'Shift+CmdORCtrl+E',
          click: menuItem => {
            enableCycledEffect(menuItem.menu.items)
            mainWindow.webContents.send('effect-cycle')
          }
        },
        {
          label: 'Vanilla',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose'),
        },
        {
          label: 'Ascii',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'ascii')
        },
        {
          label: 'Daltonize',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'daltonize')
        },
        {
          label: 'Hex',
          type: 'radio',
          click: _ => mainWindow.webContents.send('effect-choose', 'hex')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Photos Directory',
          click: _ => images.openDir(images.getPicturesDir(app))
        }
      ]
    }
  ]
    


  if (process.platform === 'darwin') {
    template.unshift({
      label: name,
      submenu: [
        {
          lable: 'About '+ name,
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide Others',
          accelratior: 'Commad_Shift+H',
          role: 'hideothers',
        },
        {
          label: 'show All',
          role: 'unhide',
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: _ => { app.quit() }
        },
      ]
    })
  }
  return template
}
