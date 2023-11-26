import { CollectionConfig } from "payload/types";

const VideoGames: CollectionConfig = {
    slug: 'videogames',
    access: {
        read: () => true,
        create:()=>true,
        update: () => true,
        delete:()=>true
    },
    admin: {},
    fields: [
        {
            name:'Nombre',
            type: 'text',
            required: true,
            unique: true
        },
        {
            name: 'Compania',
            type: 'text',
            required: true
        },
        {
            name: 'FechaDeLanzamiento',
            type: 'date',
            required: true
        },
        {
            name: 'ImagenDelVideojuego',
            type: 'relationship',
            relationTo: 'media',
            hasMany: false,
            required: true            
        }
    ]
}

export default VideoGames;