import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'

const MerchPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <GraphQLErrorList errors={errors} />
    )
  }

  return (
    <React.Fragment>
      <SEO title='Merch' />
      <Container>
        <h1>Merch products go here</h1>
      </Container>
    </React.Fragment>
  )
}

export default MerchPage