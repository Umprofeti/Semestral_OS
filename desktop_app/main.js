// Importar las dependencias
const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");

// Crear una ventana del navegador
app.on("ready", () => {
  const win = new BrowserWindow({
    width: 500,
    height: 750,
    title: "Proyecto Final SO",
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
    icon:'img/icon.png',
  });
    // Elimina la barra de menú
    Menu.setApplicationMenu(null);

  win.loadURL("http://localhost:3000/");
});
