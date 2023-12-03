// Importar las dependencias
const { app, BrowserWindow, Menu, dialog} = require("electron");
const {print} = require('pdf-to-printer')
const http = require('http');
const printUnix = require('unix-print')
const os = require('os');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs')

const createFolders = () => {
  if(!fs.existsSync('./pdf')){
    fs.mkdirSync('./pdf')
  }
  if(!fs.existsSync('./temp')){
    fs.mkdirSync('./temp')
  }
}

createFolders()

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

  createDocument.text("EXAMEN SEMESTRAL SISTEMAS OPERATIVOS 9LS-131 2023", 100, 50, {stroke: true, align: 'center'})
  createDocument.text("Integrantes: Jonathan Rodríguez, Eric Soto, Abdel Lasso", 100, 100)
  createDocument.text("Resultados:", 100, 160)
  createDocument.text(`Nombre del Videojuego: ${NombreDelVideoJuego}`, 100, 200)
  createDocument.text(`Compañía: ${CompaniaCreadora}`, 100,215)
  createDocument.text(`Fecha de Lanzamiento: ${LanzamientoJuego}`, 100,230)
  createDocument.text(`Imagen del Videojuego:`, 100,245)
  createDocument.image(ImagenJuego, 100,260, {
    width: 220,
    height: 305,
    scale: 0.25
  })
  let outpath = `${__dirname}/pdf/ImprimirInformacion.pdf`
  let outputStream = fs.createWriteStream(outpath);
  createDocument.pipe(outputStream);
  createDocument.end()
  outputStream.on('finish', ()=> {
    outputStream.close()
  })
  return outpath
} 

const printInOS = async (pdf) => {
  if(os.platform() == 'linux'){
    await printUnix.print(pdf).then(console.log('Imprimiendo desde linux'))
  }
  if(os.platform() == 'win32'){
    await print(pdf).then(console.log("Imprimiendo desde windows"))
  }
  return true
}

// Crear una ventana
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
  Menu.setApplicationMenu(null);
    
  win.loadURL("http://localhost:3000/");
});

// Servidor para captar los datos para realizar la impresión
const express = require('express');
const appExpress = express();
appExpress.use(express.json());

appExpress.post('/createpdf', async (req, res) => {
  let {inputNombreJuego, inputCompania, inputLanzamiento, imagenJuego} = req.body 
  const nombreArchivoTemporal = `./temp/imagen_temporal.jpg`
  await descargarImagen(imagenJuego)
  let pdf = handlePDF(inputNombreJuego, inputCompania, inputLanzamiento, nombreArchivoTemporal)
  if(fs.existsSync(pdf)){
    await printInOS(pdf).catch((e)=> console.log(e))
  }
});

appExpress.post('/error', (req, res)=> {
  let { errorMesage, titleMesage } = req.body;
  dialog.showMessageBox({message: errorMesage, title: titleMesage, icon: './img/icon.png'})
})

appExpress.listen(3020);