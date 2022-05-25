import React from 'react';

const MyItems = () => {
  
  const getMyItems = async () => {
    try {
      //Specific endpoint for myitems? or just different query
      const response = await fetch('/items/:id')
      const jsonResponse = await response.json();
    }
    catch (error) {
        console.log(error.message)
    }
  }
  
  return (
    <>
    My Items
    </>
  )
}

export default MyItems;