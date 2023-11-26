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
const queryDeleteGame = gql`
    mutation DeleteGame($id:String!){
    deleteVideogame(id:$id){
        id
    }
}
`;

const queryAddGame = gql`
    mutation AddGame($Nombre:String!,$Compania:String!,$FechaDeLanzamiento:String!,$ImagenDelVideojuego:String!){
        createVideogame(data:{Nombre:$Nombre,Compania:$Compania,FechaDeLanzamiento:$FechaDeLanzamiento,ImagenDelVideojuego:$ImagenDelVideojuego},draft:true){
            Nombre
            Compania
            FechaDeLanzamiento
            ImagenDelVideojuego{
                id
            }
        }   
    }
`;

const queryModGame = gql`
    mutation ModGame($id:String!, $Nombre:String!, $Compania:String!,$FechaDeLanzamiento:String!,$ImagenDelVideojuego:String){
    updateVideogame(
        id:$id,
        autosave:true,
        data:{
        Nombre:$Nombre, 
        Compania:$Compania, 
        FechaDeLanzamiento:$FechaDeLanzamiento, 
        ImagenDelVideojuego:$ImagenDelVideojuego}, 
        draft: true){
        Nombre
        Compania
        FechaDeLanzamiento
        ImagenDelVideojuego{
        id
        }
    }
    }
`;
export {queryDatos,queryDeleteGame,queryAddGame,queryModGame};