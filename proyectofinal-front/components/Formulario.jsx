import React from 'react'
import CargarImagen from './CargarImagen';

export default function Formulario() {

    const handleSubmit = (e)=>{
        // e.preventDefault();
        
      }

  return (
    <>
        <form onSubmit={handleSubmit()}>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Nombre del video juego</label>
                <input className='inputBiselado ' type='text' placeholder='Ingrese el nombre'/>
            </div>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Compañia creadora</label>
                <input className='inputBiselado ' type='text' placeholder='Ingrese compañia'/>
            </div>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Fecha de lanzamiento</label>
                <input className='inputBiselado ' type='date'/>
            </div>
            <div className=' px-8 h-64 mx-auto '>
                <CargarImagen/>
            </div>
            <div className='text-center mt-5 mb-6 mx-6'>
                <button type='button' className='btnBiselado'>Guardar datos</button>
            </div>
        </form>
    </>
  )
}
