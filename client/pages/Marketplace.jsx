import React from 'react'
import PostingButton from '../components/postingButton'

const Marketplace = () => {

  //make a call to the backend for all the items in the Marketplace

  //create an array of renders components
  const itemsOfInterest = []
  //loop through the response from backend to render container components to be displayed

  return(
    <>
      <h3>Marketplace items here</h3>
      <PostingButton />
      {itemsOfInterest}
    </>
  )
}

export default Marketplace;