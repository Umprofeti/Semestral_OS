// Importar las dependencias
const { app, BrowserWindow, Menu} = require("electron");
const {print} = require('pdf-to-printer')
const http = require('http');

const os = require('os');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs')

function descargarImagen(url) {
  return new Promise((resolve, reject) => {
    // Crear un nombre de archivo temporal
    const nombreArchivoTemporal = path.join(__dirname, './temp/imagen_temporal.jpg');

    const archivo = fs.createWriteStream(nombreArchivoTemporal);
    http.get(url, (res) => {
      res.pipe(archivo);

      archivo.on('finish', () => {
        archivo.close(() => resolve(nombreArchivoTemporal));
      });
    }).on('error', (err) => {
      fs.unlink(nombreArchivoTemporal);
      reject(err.message);
    });
  });
}

const handlePDF = (NombreDelVideoJuego,
    CompaniaCreadora,
    LanzamientoJuego,
    ImagenJuego) => {
    let createDocument = new PDFDocument;

    createDocument.text(NombreDelVideoJuego, 100, 100)
    createDocument.text(CompaniaCreadora, 100,200)
    createDocument.text(LanzamientoJuego, 100,300)
    createDocument.image(ImagenJuego, 100,400)

    let outpath = `${__dirname}/pdf/ImprimirInformacion.pdf`
    let outputStream = fs.createWriteStream(outpath);

    createDocument.pipe(outputStream);
    createDocument.end()
} 
// Crear una ventana del navegador
app.on("ready", () => {
  const win = new BrowserWindow({
    width: 500,
    height: 750,
    title: "Proyecto Final SO",
    resizable: false,
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      nodeIntegration: true
    },
    icon:'img/icon.png',
  });

    // Elimina la barra de menú
    //Menu.setApplicationMenu(null);
   
    
    
  win.loadURL("http://localhost:3000/");
});

// En tu proceso principal de Electron
const express = require('express');
const appExpress = express();
appExpress.use(express.json());

appExpress.post('/createpdf', (req, res) => {
  let {inputNombreJuego, inputCompania, inputLanzamiento, imagenJuego} = req.body 
  
  descargarImagen(imagenJuego).then(async (nombreArchivoTemporal)=>{
    handlePDF(inputNombreJuego, inputCompania, inputLanzamiento, `${nombreArchivoTemporal}`)
    await print(`${__dirname}/pdf/ImprimirInformacion.pdf`).then(console.log("Imprimiendo"))
  })
 
});

appExpress.listen(3020);