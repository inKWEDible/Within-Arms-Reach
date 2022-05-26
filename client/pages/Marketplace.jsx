import React, { useEffect, useState } from 'react'
import PostingButton from '../components/postingButton'


const Marketplace = () => {
  const [itemsMarket, setMarket] = useState([])

  //function to proposeTrade
  const proposeTrade = async (event) => { 
    alert('just send them a friggin email: @danteng@gmail.com');
    // const body = {userId: event.target.name}; 
    // console.log(body); 
    // try {   
    //   const result = await fetch('/email', {
    //     method: 'POST',
    //     headers:{'Content-Type': 'application/json'},
    //     body: JSON.stringify(body)
    //   });
    //   console.log(result); 
    //   //alert('Just send them a friggin email: ' + result); 
    //   //alert(`Just send them a friggin email: `, result);  
    // } catch (error) {
    //   console.log('failed to get email')
    // }
  }

  const getMarketplace = async () => {
    try {
      const response = await fetch('/items')
      console.log('THIS IS THE RESPONSE FROM FETCHING FROM DB', response);
      const jsonResponse = await response.json();
      console.log('jsonresponse', jsonResponse)

      const newMarket = []
      for(let i = 0; i < jsonResponse.length; i++){ 
        newMarket.push(
          <div id={jsonResponse[i].itemKey}>
            <ul>
              <li>Photo: {jsonResponse[i].photo}</li>
              <li>Name: {jsonResponse[i].name}</li>
              <li>Description: {jsonResponse[i].description}</li>
              <li><button name={jsonResponse[i].userid} onClick={proposeTrade}>Propose Trade</button></li>
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

  useEffect(() => {
    getMarketplace();
  },[]);

  return(
    <>
    <div>
      <h3>Within Arms Reach</h3>
        <PostingButton />
        <div className="marketplace">
          {itemsMarket}
        </div>
    </div>
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