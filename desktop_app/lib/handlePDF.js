const PDFDocument = require('pdfkit');
const fs = require('fs')

const handlePDF = (NombreDelVideoJuego,
    CompaniaCreadora,
    LanzamientoJuego,
    ImagenJuego) => {
    let createDocument = new PDFDocument;

    createDocument.text(NombreDelVideoJuego, 100, 100)
    createDocument.text(CompaniaCreadora, 200,200)
    createDocument.text(LanzamientoJuego, 300,300)
    createDocument.image(ImagenJuego, 400,400)

    let outpath = '../pdf/ImprimirInformacion.pdf'
    let outputStream = fs.createWriteStream(outpath);

    createDocument.pipe(outputStream);
    createDocument.end()
} 

export default handlePDF