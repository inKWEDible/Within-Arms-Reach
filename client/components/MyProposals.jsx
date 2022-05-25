import React, { useEffect, useState } from 'react';


const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  
  const getMyProposals = async () => {
    try {
      const response = await fetch('/trade')
      const jsonResponse = await response.json();
      console.log('jsonresponseMyProposal', jsonResponse)
      const allMyProposals = [];
      for (let i = 0; i < jsonResponse.length; i++) {
        newMyItems.push(
          <div>
            <ul>
            <li key={`photo.${jsonResponse[i].photo}`}>Photo: {jsonResponse[i].photo}</li>
            <li key={`name.${jsonResponse[i].name}`}>Name: {jsonResponse[i].name}</li>
            <li key={`desc.${jsonResponse[i].description}`}>Description: {jsonResponse[i].description}</li>
            <span>
              <button className='button' id='accept' onClick={handleAcceptTrade}>Accept Offer</button>
              <button className='button' id='reject' onClick={handleRejectOffer}>Reject Offer</button>                
            </span>
            </ul>
          </div>
        )
      }
    setProposals(allMyProposals)
    }
    catch (error) {
      console.log(error.message)
    }
  }

  // Accept trade fx invoked when accept button is clicked.
  const handleAcceptTrade = () => {
    console.log('handleAcceptTrade clicked')
    // what are we passing to the back end for item accept/delete?
    const tradesies = jsonResponse.itemkey
    fetch('/trade', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tradesies)
    })
    .then(data => data.json())
    .then(result => {
      if (result.status === 200) {
        // remove item from dom?
        // render a "trade accepted" status?
      }
    })
    .catch(err => {console.log(err)})
  }

  // Reject offer fx invoked when "reject" button is clicked
  const handleRejectOffer = () => {
    // DELETE? request to backend? deleteing item from proposals table?
    // fetch('')
    console.log('handleRejectOffer clicked')
  }

  
  useEffect(() => {
    getMyProposals()
  }, [])

  return (
    <div className='myProposals-div'>
    My Proposals
    {proposals}
    </div>
  )
}

export default MyProposals;

//Core Functionality of MyProposals Component
// displayed on profile page
// fetches any proposals from backend/db
// displays all 
// each component has an accept and reject button

//ACCEPT TRADE OFFER
// patch/put? fetch call to db
// render a status? "Offer Accepted" 

//DECLINE TRADE OFFER
// delete fetch call to db?
// render a "deleted" status? 
// remove from DOM?