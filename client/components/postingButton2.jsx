import React, { useState } from 'react';
import Modal from './Modal'

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

export default function postingButton2(){
  const [open, setOpen] = useState(false)

  return(
    <>
      <div style={BUTTON_WRAPPER_STYLES}>
        <button onClick={() => {setOpen(true)}}>Open Modal</button>
      </div>

      {open && <Modal open={setOpen} onClose={() => {setOpen(false)}} />}

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    </>
  )
}