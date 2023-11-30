import Formulario from '@/components/Formulario'
import React from 'react'
import localFont from 'next/font/local';


const DotGothicFuente = localFont({src:"../fonts/DotGothic16/DotGothic16-Regular.ttf"})

export default async function Iniciopage() {


  return (
    <div style={DotGothicFuente.style} className='ventanaElectron text-zinc-950 subpixel-antialiased		'>
      <h1 className='text-center  py-4 text-xl font-semibold tracking-widest		'>Sistema de colección de videojuegos</h1>
      <Formulario />
    </div>
  )
}
