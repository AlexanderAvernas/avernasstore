export default {
  name: 'aboutFirstpage',
  title: 'About Firstpage Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Header-text som visas centrerat över bilden',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Aktivera banner',
      type: 'boolean',
      description: 'Visa denna banner på hemsidan',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'isActive'
    },
    prepare(selection) {
      const {title, media, active} = selection
      return {
        title: `${title} ${active ? '✅' : '❌'}`,
        media: media
      }
    }
  }
}