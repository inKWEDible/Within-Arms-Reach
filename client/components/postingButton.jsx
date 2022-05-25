import React, { useState } from 'react';

const postingButton = () => {

  const [show, setShow] = useState(false)

  //function to show modal when clicked
  const handleShow = () => setShow(true)

  //makes a post request to the db to put in information


  return(
    <button onClick={handleShow}>Post New Item</button>
  )
}

export default postingButton;