'use client'
import React, {useState} from 'react'
import Image from 'next/image'

export default function CargarImagen() {
const [imagenSeleccionada, agregarImagenSeleccionada] =useState(null)
const handleImagenSeleccionada=(e)=>{
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        agregarImagenSeleccionada(imageUrl);
      }
}

  return (
    <>
        {imagenSeleccionada !== null ? 
            <>
                <Image src={imagenSeleccionada} width={720} height={480} alt='prueba'/>
                <button type='button' className='btnBiselado' onClick={()=>{agregarImagenSeleccionada(null)}}>Quitar imagen</button>
            </>
            :
            <div className='w-full h-full bg-slate-300 flex justify-center items-center agregarImagenBiselado'>
                <input type='file' accept="image/*" className='text-slate-500' onChange={(e)=>{handleImagenSeleccionada(e)}}/>
            </div>
        }
    </>
  )
}
