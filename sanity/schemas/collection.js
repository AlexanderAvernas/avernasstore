export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Collection Name',
      type: 'string',
      options: {
        list: [
          {title: 'Womanpower', value: 'womanpower'},
          {title: 'Coins', value: 'coins'},
          {title: 'Happy Planets', value: 'happyplanets'},
          {title: 'Letter', value: 'letter'},
          {title: 'Symbols', value: 'symbols'},
          {title: 'Rod', value: 'rod'},
          {title: 'Connect', value: 'Connect'},
          {title: 'Earcuffs', value: 'earcuffs'},
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Bild för denna kollektion. Om ingen bild väljs används backup-bilden.'
    },
    {
      name: 'displayOrder',
      title: 'Visningsordning',
      type: 'number',
      description: 'Lägre nummer visas först',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}