'use client'
import React, {useState} from 'react'
import CargarImagen from './CargarImagen';
import {queryDeleteGame,queryAddGame, queryModGame} from '@/src/QUERY/querys';
import { useMutation } from '@apollo/client';


export default function Formulario({data}) {
    
    const [inputBuscarJuego, cambiarInputBuscarJuego]= useState("");
    const [inputNombreJuego, cambiarInputNombreJuego]= useState("");
    const [inputCompania, cambiarInputCompania]= useState("");
    const [inputLanzamiento, cambiarInputLanzamiento]= useState("");
    const [imagenJuego, cambiarImagenJuego] = useState({});
    const [controlEncontrado, cambiarControlEncontrado] = useState(false);
    const [idGame, cambiarIdGame] = useState("")
    const [imagenSubir, agregarImagenSubir] =useState(null)
    const [imagenSeleccionada, agregarImagenSeleccionada] =useState(null)
    const [actualizarImg, cambiarActualizaImg] = useState(false);


    const [deleteGame, {data:dataDelete, loanding,error}] = useMutation(queryDeleteGame)
    const [addGame, {data:dataAdd, loanding:loandingAdd,error:errorAdd}] = useMutation(queryAddGame)
    const [modGame, {data:dataMod, loanding:loandingMod,error:errorMod}] = useMutation(queryModGame)

    const onChange =(e)=>{
        if(e.target.name ==="inputBuscar"){
            cambiarInputBuscarJuego(e.target.value)
        }else if(e.target.name ==="inputNombre"){
            cambiarInputNombreJuego(e.target.value)
        }else if(e.target.name ==="inputCompania"){
            cambiarInputCompania(e.target.value)
        }else if(e.target.name ==="inputFecha"){
            cambiarInputLanzamiento(e.target.value)
        }
    }
    const buscarJuego = ()=>{
        // console.log(data.Videogames.docs)
        cambiarControlEncontrado(false)
        cambiarImagenJuego({});
        if(data.Videogames.docs.find((juego)=> juego.Nombre ===inputBuscarJuego)){
            let juegoEncontrado = data.Videogames.docs.find((juego)=> juego.Nombre ===inputBuscarJuego)
            let lanzamiento = new Date(juegoEncontrado.FechaDeLanzamiento)
            cambiarIdGame(juegoEncontrado.id)
            cambiarInputNombreJuego(juegoEncontrado.Nombre)
            cambiarInputCompania(juegoEncontrado.Compania)
            cambiarInputLanzamiento(formatearFecha(lanzamiento));
            cambiarImagenJuego(juegoEncontrado.ImagenDelVideojuego);
            cambiarControlEncontrado(true)
        }
    }
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', imagenSubir);
        const option ={
            method: 'POST',
            body: formData,
        }
        try {
            const response = await fetch('http://localhost:3040/api/media', option).then((res) => res.json());
            await addGame({
                variables:{
                    Nombre: inputNombreJuego,
                    Compania: inputCompania,
                    FechaDeLanzamiento:inputLanzamiento,
                    ImagenDelVideojuego: response.doc.id
                }
            })
            console.log(dataAdd)
            limpiarCampos()

            // console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const limpiarCampos =()=>{
        cambiarInputNombreJuego("");
        cambiarInputCompania("")
        cambiarInputLanzamiento("")
        agregarImagenSubir(null)
        cambiarControlEncontrado(false)
        cambiarImagenJuego({})
        agregarImagenSeleccionada(null)
    }
    

    

    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const año = fechaObj.getFullYear();
        let mes = fechaObj.getMonth() + 1;
        let dia = fechaObj.getDate();
      
        mes = mes < 10 ? `0${mes}` : mes;
        dia = dia < 10 ? `0${dia}` : dia;
      
        return `${año}-${mes}-${dia}`;
      };

      const handleSubmit = async (e)=>{
        e.preventDefault();
      }

      const modificarGame = async()=>{
        const formData = new FormData();
        formData.append('file', imagenSubir);
        const option ={
            method: 'POST',
            body: formData,
        }
        try {
            if(actualizarImg){
                const response = await fetch('http://localhost:3040/api/media', option).then((res) => res.json());
                await modGame({
                    variables:{
                        id:idGame,
                        Nombre:inputNombreJuego,
                        Compania:inputCompania,
                        FechaDeLanzamiento:inputLanzamiento,
                        ImagenDelVideojuego: response.doc.id
                    }
                })
            }else{
                await modGame({
                    variables:{
                        id:idGame,
                        Nombre:inputNombreJuego,
                        Compania:inputCompania,
                        FechaDeLanzamiento:inputLanzamiento,
                    }
                })
            }
        } catch (error) {
            console.error("Error en la operación:", error);
        }
      }

      const eliminarGame =async ()=>{
        try {
            await deleteGame({
                variables:{
                    id: idGame
                }
            })
            limpiarCampos(0)
        } catch (error) {
            console.error("Error en la operación:", error);
        }
      }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Nombre del video juego</label>
                <input className='inputBiselado ' type='text' placeholder='Ingrese el nombre'
                value={inputNombreJuego}
                onChange={onChange}
                name='inputNombre'/>
            </div>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Compañia creadora</label>
                <input className='inputBiselado ' type='text' placeholder='Ingrese compañia'
                value={inputCompania}
                onChange={onChange}
                name='inputCompania'/>
            </div>
            <div className='text-center my-5 mx-6 flex justify-between'>
                <label>Fecha de lanzamiento</label>
                <input className='inputBiselado ' type='date'
                value={inputLanzamiento}
                onChange={onChange}
                name='inputFecha'/>
            </div>
            <div className=' px-8 h-64 mx-auto'>
                <CargarImagen imagenSubir={imagenSubir} agregarImagenSubir={agregarImagenSubir} cambiarControlEncontrado={cambiarControlEncontrado} controlEncontrado={controlEncontrado} imagenJuego={imagenJuego} cambiarImagenJuego={cambiarImagenJuego} agregarImagenSeleccionada={agregarImagenSeleccionada} imagenSeleccionada={imagenSeleccionada} cambiarActualizaImg={cambiarActualizaImg}/>
            </div>
            <div className='text-center mt-10 mb-6 mx-6'>
                <button className='btnBiselado' onClick={()=>{handleUpload()}}>Guardar datos</button>
                <button className='mx-1 btnBiselado' onClick={()=>{modificarGame()}}>Modificar juego</button>
                <button className='mx-1 btnBiselado' onClick={()=>{eliminarGame()}}>Eliminar juego</button>
            </div>
        </form>
        <div className='text-center my-4 mx-5'>
            <input 
            className='inputBiselado mx-1' 
            type='text' 
            placeholder='Juego a buscar'
            value={inputBuscarJuego}
            onChange={onChange}
            name='inputBuscar'
            />
            <button className='mx-1 btnBiselado' onClick={()=>buscarJuego()} >Buscar juego</button>
        </div>
    </>
  )
}
