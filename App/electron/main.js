import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 500,
        minHeight: 700,
        width: 500,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, '../electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        // --- THIS IS THE KEY PART ---
        titleBarStyle: 'hidden', // This hides the standard native title bar
        titleBarOverlay: {
            color: '#2f3241',      // <--- Your desired background color for the custom area
            symbolColor: '#74b1be', // <--- Color of the minimize/maximize/close symbols
            height: 32              // <--- Height of the title bar overlay (adjust as needed)
        }
        // --- END KEY PART ---
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    // mainWindow.webContents.openDevTools(); // Show Devtools
}

app.whenReady().then(() => {
    //additional logic here
}).then(createWindow)

app.on('window-all-closed', () => {
    // eslint-disable-next-line no-undef
    if (process.platform !== 'darwin') {
        app.quit()
    }
})