'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DocumentoPDF from './GeneadorPDF'


export default function CargarImagen({limpiarCampos,cambiarActualizaImg,agregarImagenSeleccionada, imagenSeleccionada,agregarImagenSubir,controlEncontrado,imagenJuego,cambiarImagenJuego,cambiarControlEncontrado, inputNombreJuego, inputLanzamiento, inputCompania}) {


  const handlePDF = async () => {
    let data = {
      inputNombreJuego,
      inputCompania,
      inputLanzamiento,
      imagenJuego: imagenJuego.url
    }
   await fetch('http://localhost:3020/createpdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
  }
  
  

  const handleImagenSeleccionada=(e)=>{
    const file = e.target.files[0];
    if (file) {
      agregarImagenSubir(file)
      const imageUrl = URL.createObjectURL(file);
      agregarImagenSeleccionada(imageUrl);
    }
  }

    const quitarImagenes=()=>{
      cambiarActualizaImg(true)
      agregarImagenSeleccionada(null)
      cambiarImagenJuego({})
      cambiarControlEncontrado(false)
    }

  return (
    <>
        {imagenSeleccionada !== null || controlEncontrado === true? 
            <div className=' text-center object-contain'>
                <Image src={imagenSeleccionada !== null? imagenSeleccionada : imagenJuego.url} width={720} className='max-w-[220px] max-h-[153px] mx-auto object-contain' height={480} alt='prueba'/>
                
                <button type='button' className='btnBiselado my-2' onClick={()=>quitarImagenes()}>Quitar imagen</button>
                <button type='button' onClick={()=>handlePDF()} className='btnBiselado mx-2'>Imprimir registro</button>
                <button type='button' className='btnBiselado my-2' onClick={()=>{limpiarCampos()}}>Limpiar</button>

        
            </div>
            :
            <div className='w-full h-full bg-slate-300 flex justify-center items-center agregarImagenBiselado'>
                <input type='file' accept="image/*" className='text-slate-500' onChange={(e)=>{handleImagenSeleccionada(e)}}/>
            </div>
        }
    </>
  )
}
