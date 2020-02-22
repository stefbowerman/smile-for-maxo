import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'

const VideoPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <GraphQLErrorList errors={errors} />
    )
  }

  return (
    <React.Fragment>
      <SEO title='Video' />
      <Container>
        <h1>Videos get listed here</h1>
      </Container>
    </React.Fragment>
  )
}

export default VideoPage