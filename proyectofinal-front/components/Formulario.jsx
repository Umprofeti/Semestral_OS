"use client";
import React, { useState } from "react";
import CargarImagen from "./CargarImagen";
import {
  queryDeleteGame,
  queryAddGame,
  queryModGame,
  queryDatos
} from "@/src/QUERY/querys";
import { useMutation, useLazyQuery } from "@apollo/client";


export default function Formulario() {
  //Constantes para manipular la información que introdusca el usuario
  // const [data, cambiarData]=useState(null);
  const [inputBuscarJuego, cambiarInputBuscarJuego] = useState("");
  const [inputNombreJuego, cambiarInputNombreJuego] = useState("");
  const [inputCompania, cambiarInputCompania] = useState("");
  const [inputLanzamiento, cambiarInputLanzamiento] = useState("");
  const [imagenJuego, cambiarImagenJuego] = useState({});
  const [controlEncontrado, cambiarControlEncontrado] = useState(false);
  const [idGame, cambiarIdGame] = useState("");
  const [imagenSubir, agregarImagenSubir] = useState(null);
  const [imagenSeleccionada, agregarImagenSeleccionada] = useState(null);
  const [actualizarImg, cambiarActualizaImg] = useState(false);

  //funciones de mutaciones para agregar, modificar y borrar informacion en la base de datos
  const [deleteGame, { data: dataDelete, loading:loadingDelete, error: errorDelete }] =
    useMutation(queryDeleteGame);
  const [addGame, { data: dataAdd, loading: loadinggAdd, error: errorAdd }] =
    useMutation(queryAddGame);
  const [modGame, { data: dataMod, loading: loadinggMod, error: errorMod }] =
    useMutation(queryModGame);
  const [searchData,{ data, loading, error }] =
  useLazyQuery(queryDatos);

  //Guarda la información que introduzca el usuario en los inputs
  const onChange = (e) => {
    if (e.target.name === "inputBuscar") {
      cambiarInputBuscarJuego(e.target.value);
    } else if (e.target.name === "inputNombre") {
      cambiarInputNombreJuego(e.target.value);
    } else if (e.target.name === "inputCompania") {
      cambiarInputCompania(e.target.value);
    } else if (e.target.name === "inputFecha") {
      cambiarInputLanzamiento(e.target.value);
    }
  };

  //Funcion de buscar juego tras presionar el boton "Buscar Juego"
  const buscarJuego = () => {
    cambiarControlEncontrado(false);
    cambiarImagenJuego({});
    if (
      data.Videogames.docs.find((juego) => juego.Nombre === inputBuscarJuego)
    ) {
      let juegoEncontrado = data.Videogames.docs.find(
        (juego) => juego.Nombre === inputBuscarJuego
      );
      let lanzamiento = new Date(juegoEncontrado.FechaDeLanzamiento);
      cambiarIdGame(juegoEncontrado.id);
      cambiarInputNombreJuego(juegoEncontrado.Nombre);
      cambiarInputCompania(juegoEncontrado.Compania);
      cambiarInputLanzamiento(formatearFecha(lanzamiento));
      cambiarImagenJuego(juegoEncontrado.ImagenDelVideojuego);
      cambiarControlEncontrado(true);
    }
  };
  //Funcion que sube la información a la base de datos
  const handleUpload = async () => {

    if(validarCampos(inputNombreJuego, inputCompania, inputLanzamiento, imagenSubir) === false){
      const formData = new FormData();
      formData.append("file", imagenSubir);
      const option = {
        method: "POST",
        body: formData,
      };
      try {
        const response = await fetch(
          process.env.MEDIA_URI,
          option
        ).then((res) => res.json());
        await addGame({
          variables: {
            Nombre: inputNombreJuego,
            Compania: inputCompania,
            FechaDeLanzamiento: inputLanzamiento,
            ImagenDelVideojuego: response.doc.id,
          },
        });
        limpiarCampos();
      } catch (errorAdd) {
        if(errorAdd){
          enviarError("Error, se ha intentado ingresar un nombre de un juego ya existente en la base de datos", "Error al guardar")
        }
      }
    }else{
      enviarError("Error, hay campos vacios.", "Mensaje del formulario")
    }
  };

  //Peticion para mandar mensaje de errore
  const enviarError= async(mensajeEnviar, tituloMensaje)=>{
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ errorMesage: mensajeEnviar, titleMesage: tituloMensaje }),
    };

    const responseError = await fetch("http://localhost:3020/error", option)
      .then((res) => res.json())
      .catch((error) => console.error("Error en la solicitud:", error));
  }

  //Validar campos vacios para subir, modificar
  const validarCampos=(nombreI, companiaI, fechaI, imgI)=>{
      if(nombreI !== "" && companiaI !== "" && fechaI !== "" && imgI !== null){
        return false
      }else{
        return true
      }
  }

  //Formatea la fecha del payload que es formato "ISO 8601" a formato "YYYY-MM-DD"
  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const año = fechaObj.getFullYear();
    let mes = fechaObj.getMonth() + 1;
    let dia = fechaObj.getDate();

    mes = mes < 10 ? `0${mes}` : mes;
    dia = dia < 10 ? `0${dia}` : dia;

    return `${año}-${mes}-${dia}`;
  };

  //Evita que se refresque el form al presionar los botones adentro del form
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  //Funcion que actualiza una información en la base de datos
  const modificarGame = async () => {
    if(validarCampos(inputBuscarJuego, inputCompania, inputLanzamiento, imagenSubir) === false){
        const formData = new FormData();
        formData.append("file", imagenSubir);
        const option = {
          method: "POST",
          body: formData,
        };
        try {
          //Primero verificamos si es necesario actualizar la imagen, sino solo actualiza el resto de campos
          if (actualizarImg) {
            const response = await fetch(
              process.env.MEDIA_URI,
              option
            ).then((res) => res.json());
            await modGame({
              variables: {
                id: idGame,
                Nombre: inputNombreJuego,
                Compania: inputCompania,
                FechaDeLanzamiento: inputLanzamiento,
                ImagenDelVideojuego: response.doc.id,
              },
            });
          } else {
            await modGame({
              variables: {
                id: idGame,
                Nombre: inputNombreJuego,
                Compania: inputCompania,
                FechaDeLanzamiento: inputLanzamiento,
              },
            });
          }
          limpiarCampos()
        } catch (error) {
          console.error("Error en la operación:", error);
        }
    }else{
      if(idGame !== ""){
        enviarError("Error, hay campos vacios.", "Mensaje del formulario")
      }else{
        enviarError("Error, no se ha buscado/seleccionado un juego", "Error en el formulario")
      }
    }
  };

  //Funcion de borrar un Juego de acuerdo a su ID, el ID se obtiene al presionar "Buscar Juego"
  const eliminarGame = async () => {
    // if (inputNombreJuego !== "" && inputCompania !== ""&& inputLanzamiento !== "" ) {
    if (idGame!=="" ) {
        try {
            await deleteGame({
              variables: {
                id: idGame,
              },
            });
            limpiarCampos();
          } catch (error) {
            console.error("Error en la operación:", error);
        }
    }else{
      enviarError("Error, no se ha buscado/seleccionado un juego", "Error en el formulario")
    }
  };

  //Formateo de campos
  const limpiarCampos = () => {
    cambiarInputNombreJuego("");
    cambiarInputCompania("");
    cambiarInputLanzamiento("");
    // agregarImagenSubir(null);
    cambiarControlEncontrado(false);
    cambiarImagenJuego({});
    agregarImagenSeleccionada(null);
    cambiarInputBuscarJuego("")
    cambiarIdGame("");
  };

  const buscarData = () => {
    //Jonathan si ves esto luego hago lo de buscar solo un nombre el juego en la base de datos, tenía que salir
    //jajajaj
    searchData()
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="text-center my-5 mx-6 flex justify-between">
          <label>Nombre del video juego</label>
          <input
            className="inputBiselado "
            type="text"
            placeholder="Ingrese el nombre"
            value={inputNombreJuego}
            onChange={onChange}
            name="inputNombre"
          />
        </div>
        <div className="text-center my-5 mx-6 flex justify-between">
          <label>Compañia creadora</label>
          <input
            className="inputBiselado "
            type="text"
            placeholder="Ingrese compañia"
            value={inputCompania}
            onChange={onChange}
            name="inputCompania"
          />
        </div>
        <div className="text-center my-5 mx-6 flex justify-between">
          <label>Fecha de lanzamiento</label>
          <input
            className="inputBiselado "
            type="date"
            value={inputLanzamiento}
            onChange={onChange}
            name="inputFecha"
          />
        </div>
        <div className=" px-8 h-64 mx-auto">
          <CargarImagen
          limpiarCampos={limpiarCampos}
            inputNombreJuego={inputNombreJuego}
            inputLanzamiento={inputLanzamiento}
            inputCompania={inputCompania}
            imagenSubir={imagenSubir}
            agregarImagenSubir={agregarImagenSubir}
            cambiarControlEncontrado={cambiarControlEncontrado}
            controlEncontrado={controlEncontrado}
            imagenJuego={imagenJuego}
            cambiarImagenJuego={cambiarImagenJuego}
            agregarImagenSeleccionada={agregarImagenSeleccionada}
            imagenSeleccionada={imagenSeleccionada}
            cambiarActualizaImg={cambiarActualizaImg}
          />
        </div>
        <div className="text-center mt-10 mb-6 mx-6">
          <button
            className="btnBiselado"
            onClick={() => {
              handleUpload();
            }}
          >
            Guardar Datos
          </button>
          <button
            className="mx-1 btnBiselado"
            onClick={() => {
              modificarGame();
            }}
          >
            Modificar Juego
          </button>
          <button
            className="mx-1 btnBiselado"
            onClick={() => {
              eliminarGame();
            }}
          >
            Eliminar Juego
          </button>
        </div>
      </form>
      <div className="text-center my-4 mx-5">
        <input
          className="inputBiselado mx-1"
          type="text"
          placeholder="Juego a buscar"
          autoComplete="off"
          value={inputBuscarJuego}
          onChange={onChange}
          onFocus={()=>{buscarData()}}
          name="inputBuscar"
        />
        <button className="mx-1 btnBiselado" onClick={() => buscarJuego()}>
          Buscar Juego
        </button>
      </div>
    </>
  );
}
