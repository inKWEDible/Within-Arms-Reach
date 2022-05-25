import React, { useEffect, useState } from 'react'
import PostingButton from '../components/postingButton'


const Marketplace = () => {
  const [itemsMarket, setMarket] = useState([])
  const getMarketplace = async () => {
    try {
      const response = await fetch('/items')
      console.log('THIS IS THE RESPONSE FROM FETCHING FROM DB', response);
      const jsonResponse = await response.json();
      console.log('jsonresponse', jsonResponse)

      const newMarket = []
      for(let i = 0; i < jsonResponse.length; i++){
        newMarket.push(
          <div >
            <ul>
              <li>Photo: {jsonResponse[i].photo}</li>
              <li>Name: {jsonResponse[i].name}</li>
              <li>Description: {jsonResponse[i].description}</li>
            </ul>
          </div>
        )
      }
      setMarket(newMarket);
    } 
    catch (error) {
      console.log(error.message)
    }
  }
  console.log('THIS IS ITEMSMARKET', itemsMarket)
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