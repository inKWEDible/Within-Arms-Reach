import React, { useEffect, useState } from 'react';

const MyItems = () => {
  
  const [items, setMyItems] = useState([]);
  
  const getMyItems = async () => {
    try {
      //Specific endpoint for myitems? or just different query
      const body = {userId: '113909874562736516199'}; 
      const response = await fetch('/allMyItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const jsonResponse = await response.json();
      // console.log('jsonresponseMyItems', jsonResponse)
      const allMyItems = [];
      for (let i = 0; i < jsonResponse.length; i++) {
        allMyItems.push(
            <div key={`item${[i]}`}>
                <ul>
                  <li key={`photo.${jsonResponse[i].photo}`}>Photo: {jsonResponse[i].photo}</li>
                  <li key={`name.${jsonResponse[i].name}`}>Name: {jsonResponse[i].name}</li>
                  <li key={`desc.${jsonResponse[i].description}`}>Description: {jsonResponse[i].description}</li>
                  <span>
                    <button key={`button.${jsonResponse[i]}`} className='remove' onClick={handleDelete}>Remove Item</button>                      
                  </span>
                </ul>
            </div>
        )
      }
      setMyItems(allMyItems)
    }
    catch (error) {
        console.log(error.message)
    }
  }
  useEffect(()=> {
    getMyItems();
  }, []);
  
  const handleDelete = () => {
    console.log('handleDelete clicked')
  }

  return (
    <div className='myItems-div'>
    My Items
    {items}
    </div>
  )
}

export default MyItems;

//need unique keys for these components
//handleDelete function for button (react router? usestate?)