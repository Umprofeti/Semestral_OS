import { gql } from "@apollo/client";

const queryDatos = gql`
query games {Videogames(limit:50){
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

export default queryDatos;