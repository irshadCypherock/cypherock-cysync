import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { release } from 'node:os';
import { join } from 'node:path';

export default function createApp() {
  process.env.DIST_ELECTRON = join(__dirname, '../');
  process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
  process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST;

  // Disable GPU Acceleration for Windows 7
  if (release().startsWith('6.1')) app.disableHardwareAcceleration();

  // Set application name for Windows 10+ notifications
  if (process.platform === 'win32') app.setAppUserModelId(app.getName());

  if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
  }

  // Remove electron security warnings
  // This warning only shows in development mode
  // Read more on https://www.electronjs.org/docs/latest/tutorial/security
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
  let win: BrowserWindow | null = null;
  // Here, you can also use other preload
  const preload = join(__dirname, '../preload/index.js');
  const rendererUrl = process.env.VITE_DEV_SERVER_URL;
  const indexHtml = join(process.env.DIST, 'index.html');
  const icon = process.env.PUBLIC;

  async function createWindow() {
    win = new BrowserWindow({
      title: 'Main window',
      icon: join(icon, 'favicon.ico'),
      webPreferences: {
        preload,
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      if (!rendererUrl) {
        throw new Error('VITE_DEV_SERVER_URL is undefined');
      }

      // electron-vite-vue#298
      win.loadURL(rendererUrl);
      // Open devTool if the app is not packaged
      win.webContents.openDevTools();
    } else {
      win.loadFile(indexHtml);
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url);
      return { action: 'deny' };
    });
  }

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('second-instance', () => {
    if (win) {
      // Focus on the main window if the user tried to open another
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      createWindow();
    }
  });

  // New window example arg: new windows url
  ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
      webPreferences: {
        preload,
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      childWindow.loadURL(`${rendererUrl}#${arg}`);
    } else {
      childWindow.loadFile(indexHtml, { hash: arg });
    }
  });
}