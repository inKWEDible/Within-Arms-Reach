import React from 'react'
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, .7)',
  zIndex: 1
}

function Modal({ open, onClose }) {
  if(!open) return null;

  const makePost = async() =>{
    const body = {
      name: document.getElementById('itemName').value,
      description: document.getElementById('itemDes').value,
      available: true,
      photo: null,
    }
    try {
      const response = await fetch('/items', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      })
      onClose()
    } catch (error) {
      console.log(error);
    }
  }
   
  return (
    <>
    <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close</button>
        <div class='newItem'>
            <div>
              <label>New Item:</label>
              <input id='itemName' type="text" placeholder="Item Name"></input>
            </div>
            <div>
              <label>Description:</label>
              <textarea id='itemDes' placeholder="Description" cols="35" wrap="soft"></textarea>
            </div>
            <div>
              <button onClick={onClose}>Cancel</button>
              <button onClick={makePost}>Post Item</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Modal;