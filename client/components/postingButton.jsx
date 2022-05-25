import React, { useState } from 'react';
import Modal from './Modal'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

export default function postingButton(){
  const [open, setOpen] = useState(false)

  return(
    <>
      <div style={BUTTON_WRAPPER_STYLES}>
        <button onClick={() => {setOpen(true)}}>Post New Item</button>
      </div>
      {open && <Modal open={setOpen} onClose={() => {setOpen(false)}} />}
    </>
  )
}