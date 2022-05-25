import React, { useEffect } from 'react'
import PostingButton from '../components/postingButton'

const Marketplace = () => {

  //make a call to the backend for all the items in the Marketplace
  const getMarketplace = async () => {
    try {
      const response = await fetch('/items')
      const jsonResponse = await response.json();

    //create an array of renders components
    const itemsMarket = []
    //loop through the response from backend to render container components to be displayed

  //   [
  //     {
  //         "name": "sticker pack",
  //         "description": "princess mononoke sticker variety pack",
  //         "userid": 1,
  //         "photo": null
  //     },
  //     {
  //         "name": "pinneapple tray",
  //         "description": "Wooden pinnapple tray, never been used as an ash tray, possibly maple, moderate spalting, oiled",
  //         "userid": 3,
  //         "photo": null
  //     }
  // ]

    for(let i = 0; i < jsonResponse.length; i++){
      itemsMarket.push(
        <div >
          <ul>
            <li>Name: {jsonResponse.photo}</li>
            <li>Name: {jsonResponse.name}</li>
            <li>Name: {jsonResponse.description}</li>
          </ul>
        </div>
      )
    }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getMarketplace();
  },[]);

  return(
    <>
      <h3>Marketplace items here</h3>
        <PostingButton />
      {itemsMarket}
    </>
  )
}

export default Marketplace;