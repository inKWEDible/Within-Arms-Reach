import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { logIn, logOut } from '../app/userSlice'

const Splash = () => {
  
  const status = useSelector((state) => state.userStatus.loggedIn)
  const dispatch = useDispatch()
  

  // Handle click for Google OAuth button  
  const googleOAuth = () => {
    window.location = 'http://localhost:3000/signup/googleOAuth';
  };
  
  // Handle form submit for login
  const handleSignIn = (e) => {
    e.preventDefault();
    
    const loginCredentials = {
      username: document.querySelector('').value,
      password: document.querySelector('').value
    }
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials),
    })
    .then(data => data.json())
    .then(result => {
      if (result) {
        dispatch(logIn())

      } else {
        throw new Error('Unsuccessful login')
      }
    })
    .catch((err) => {
      console.log('error in login process')
    })
  };

  // const handleSignUp = (e) => {
  //   e.preventDefault();

  //   const newUserCredentials = {
  //     email: document.querySelector('#email').value,
  //     username: document.querySelector('#username').value,
  //     password: document.querySelector('#password').value,
  //     password2: document.querySelector('#password2').value
  //   }
    
  // }

  
  return (
    <div className='loginContainer'>
    {/* OAuth Button */}
      <button className='google' id='google' onClick={googleOAuth}>Sign in With Google</button>
    {/* login button */}
      
    {/* register button */}
      
    {/* button to swtich between registering and login */}
      
    </div>
  )
};

export default Splash;






// SIGNUP FORM
// <form>
//   <label htmlFor='username'>Username</label>
//   <input className='username' placeholder='username' type='text' name='username'></input>

//   <label htmlFor='password'>Password</label>
//   <input className='password' placeholder='password' name='password'></input>
//   <label htmlFor='password2'>Verify Password</label>
//   <input className='password2' placeholder='password2' name='password2'></input>
//  <button className='button' id='signup' onClick={handleSignUp}>Register</button>
// </form>


// LOGIN FORM
//   <label htmlFor='username'>Username</label>
//   <input className='username' placeholder='username' type='text' name='username'></input>

//   <label htmlFor='password'>Password</label>
//   <input className='password' placeholder='password' name='password'></input>
//   <button className='button' id='login' onClick={handleSubmit} type='submit'>Login</button>


// {showSignup ? <input className='email' id='email' type='text' placeholder='email'/> : null}

// <button className='button' id='signup' onClick={() => dispatch(logIn())}>New User? Signup</button>
      
      
    