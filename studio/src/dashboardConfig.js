export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e4f51ae53882bc471ed7826',
                  title: 'Sanity Studio',
                  name: 'smile-for-maxo-studio',
                  apiId: '343c0e29-4f46-4dea-866d-a1f38cb81c43'
                },
                {
                  buildHookId: '5e4f51ae6466617ad86079a9',
                  title: 'Blog Website',
                  name: 'smile-for-maxo',
                  apiId: '758402e0-8709-4d6a-aaa9-333df9d0ae40'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/stefbowerman/smile-for-maxo',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://smile-for-maxo.netlify.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
