import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
    slug:'media',
    access:{
        read: () => true,
        create:()=>true,
        update: () => true
    },
    fields:[],
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
}

export default Media