import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

const openURL = (url: string) => {
  let window: BrowserWindow | null = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, "./renderer.js"),
    },
  });
  window.loadURL(url);
  const obj: { current: BrowserWindow | null } = { current: window };
  window.on("closed", () => {
    console.log(window);
    obj.current = null;
  });
  return obj;
};

app.on("ready", () => {
  console.log("ready");
  const windows = [
    openURL(`file://${__dirname}/index.html`),
    openURL(`file://${__dirname}/index.html`),
    openURL(`file://${__dirname}/index.html`),
  ];
  let num = 50;
  let interval = setInterval(() => {
    const current = num--;
    if (num < 0) clearInterval(interval);
    windows.forEach((window) => {
      if (window.current) window.current.webContents.send("update", current);
    });
  }, 1000);

  // openURL(`http://bible/tas`);
});
