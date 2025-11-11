export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price (in öre)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'extraImages',
      title: 'Extra Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'tax_rate',
      title: 'Tax Rate',
      type: 'number',
      initialValue: 2500
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Rings', value: 'rings'},
          {title: 'Necklaces', value: 'necklaces'},
          {title: 'Earrings', value: 'earrings'},
          {title: 'Bracelets', value: 'bracelets'},
          {title: 'Others', value: 'others'}
        ]
      }
    },
    {
      name: 'collection',
      title: 'Collection',
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
          {title: 'Earcuffs', value: 'earcuffs'}
        ]
      }
    }
  ]
}
