export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      options: {
        list: [
          {title: 'Rings', value: 'rings'},
          {title: 'Necklaces', value: 'necklaces'},
          {title: 'Earrings', value: 'earrings'},
          {title: 'Bracelets', value: 'bracelets'},
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Bild för denna kategori. Om ingen bild väljs används backup-bilden.'
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