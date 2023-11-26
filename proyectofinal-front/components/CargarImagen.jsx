'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'

export default function CargarImagen({cambiarActualizaImg,agregarImagenSeleccionada, imagenSeleccionada,agregarImagenSubir,controlEncontrado,imagenJuego,cambiarImagenJuego,cambiarControlEncontrado}) {
  
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
                <button type='button' className='btnBiselado mt-2' onClick={()=>quitarImagenes()}>Quitar imagen</button>
            </div>
            :
            <div className='w-full h-full bg-slate-300 flex justify-center items-center agregarImagenBiselado'>
                <input type='file' accept="image/*" className='text-slate-500' onChange={(e)=>{handleImagenSeleccionada(e)}}/>
            </div>
        }
    </>
  )
}
