import Formulario from '@/components/Formulario'
import React from 'react'
import { getClient } from '@/src/context/dataContext';
import { gql } from "@apollo/client";

const queryDatos = gql`
query{
  Videogames(limit:50){
    docs{
      id
      Nombre
      Compania
      FechaDeLanzamiento
      ImagenDelVideojuego{
        url
        filename
      }
    }
  }
}
`;

export default async function Iniciopage() {
    const { data, error } = await getClient().query({query:queryDatos});
    console.log(data)

  return (
    <div className='ventanaElectron'>
      <h1 className='text-center py-4 text-xl font-semibold'>Sistema de colección de videojuegos</h1>
      <Formulario/>

      {/* Convertir a componente si es necesario */}
      <div className='text-center my-4 mx-5'>
                <input className='inputBiselado mx-1' type='text' placeholder='Juego a buscar'/>
                <button className='mx-1 btnBiselado'>Buscar juego</button>
        </div>
      {/* Convertir a componente si es necesario */}
        <div className='text-center mt-4 mx-5'>
            <button className='mx-1 btnBiselado'>Modificar juego</button>
            <button className='mx-1 btnBiselado'>Eliminar juego</button>
      </div>
    </div>
  )
}
