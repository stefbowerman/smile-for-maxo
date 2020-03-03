export default {
  name: 'album',
  type: 'document',
  title: 'Album',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'coverImage',
      type: 'mainImage',
      title: 'Cover Image'
    },
    {
      name: 'description',
      type: 'descriptionPortableText',
      title: 'Description'
    },
    {
      name: 'releaseDate',
      type: 'date',
      title: 'Release date',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      type: 'array',
      title: 'Additional Images',
      of: [
        {
          type: 'mainImage'
        }
      ]
    },
    {
      name:  'links',
      type: 'albumLinks',
      title: 'Links'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'coverImage'
    }
  }
}
