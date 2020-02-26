export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image'
    },
    {
      name: 'video',
      type: 'reference',
      description: 'Select a video to display below the main image',
      title: 'Video',
      to: [{type: 'video'}]
    }
  ]
}
