export default {
  name: 'album',
  type: 'document',
  title: 'Album',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
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
      title: 'Release date'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
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
