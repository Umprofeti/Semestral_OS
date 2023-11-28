'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DocumentoPDF from './GeneadorPDF'

export default function CargarImagen({limpiarCampos,cambiarActualizaImg,agregarImagenSeleccionada, imagenSeleccionada,agregarImagenSubir,controlEncontrado,imagenJuego,cambiarImagenJuego,cambiarControlEncontrado, inputNombreJuego, inputLanzamiento, inputCompania}) {


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
            <div className=' text-center'>
                <Image src={imagenSeleccionada !== null? imagenSeleccionada : imagenJuego.url} width={720} height={480} alt='prueba'/>
                
                <button type='button' className='btnBiselado my-2' onClick={()=>quitarImagenes()}>Quitar imagen</button>
                
                <PDFDownloadLink 
                document={<DocumentoPDF
                  NombreDelVideoJuego={inputNombreJuego}
                  CompaniaCreadora={inputCompania}
                  LanzamientoJuego={inputLanzamiento}
                  ImagenJuego={imagenJuego}
                />}
                fileName='Información Videojuego'>
                  {({loading,error})=>(loading?<button>Cargando...</button>:<button className='btnBiselado mx-2'>Imprimir registro</button>)}
                </PDFDownloadLink>

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
