import Formulario from '@/components/Formulario'
import React from 'react'
import { getClient } from '@/src/context/dataContext';
import {queryDatos} from '@/src/QUERY/querys';

export default async function Iniciopage() {
  const { data, error } = await getClient().query({query:queryDatos});
  
  return (
    <div className='ventanaElectron'>
      <h1 className='text-center py-4 text-xl font-semibold'>Sistema de colección de videojuegos</h1>
      <Formulario data={data} />

      {/* Convertir a componente si es necesario */}
    </div>
  )
}
