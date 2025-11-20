export default {
  name: 'specialOffer',
  title: 'Special Offer Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'T.ex. "Julrea 2024" eller "Alla hjärtans dag"',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Kort beskrivning av erbjudandet'
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Se erbjudanden',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Aktivera erbjudande',
      type: 'boolean',
      description: 'Visa denna banner på hemsidan',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      active: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, media, active} = selection
      return {
        title: `${title} ${active ? '✅' : '❌'}`,
        subtitle: subtitle,
        media: media
      }
    }
  }
}
