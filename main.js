const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Use the GPU fully and don't cap the frame rate at 60.
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('use-angle', 'd3d11');

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1600, height: 900, backgroundColor: '#0b1418',
    title: 'Aerodrome', autoHideMenuBar: true, show: false,
    webPreferences: { backgroundThrottling: false }
  });
  win.once('ready-to-show', () => { win.show(); win.setFullScreen(true); });
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type === 'keyDown' && i.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
  win.loadFile(path.join(__dirname, 'game', 'index.html'));
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
