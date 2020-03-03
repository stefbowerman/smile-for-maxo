import React from 'react'

const VideoPreview = props => {
  console.log(props)
  return (
    <pre>{JSON.stringify(props, null, 2)}</pre>
  )
}

export default {
  name: 'video',
  type: 'document',
  title: 'Video',
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
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube URL'
    },
    {
      name: 'releaseDate',
      type: 'date',
      title: 'Release date',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      type: 'mainImage',
      title: 'Cover Image'
    },
    {
      name: 'caption',
      type: 'descriptionPortableText',
      title: 'Caption'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'youtubeUrl'
    },
    component: VideoPreview
  }
}
