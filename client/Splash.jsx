import React from 'react';
import { useState } from 'react';

const Splash = () => {
  
  const [ showSignup, setShowSignup ] = useState(false);
  

  // Handle click for Google OAuth button  
  const googleOAuth = () => {
    window.location = 'http://localhost:3000/signup/googleOAuth';
  };
  
  // Handle form submit for login
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let { username, password } = document.forms[0];
    console.log('document', document.forms[0])
    console.log('username', username.value, 'password', password.value);
  };

  
  return (
    
    <div className='loginContainer'>
        Welcome to Within Arms Reach - a marketplace where you can trade items within arms reach
      <button className='google' id='google' onClick={googleOAuth}>Sign in With Google</button>
      <div className='loginForm'>
        <form>
          <label htmlFor='username'>Username</label>
          <input className='username' placeholder='username' type='text' name='username'></input>

          <label htmlFor='password'>Password</label>
          <input className='password' placeholder='password' name='password'></input>

          <button className='button' id='login' onClick={handleSubmit} type='submit'>Login</button>
        </form>
        
        {showSignup ? <input className='email' id='email' type='text' placeholder='email'/> : null}

        <button className='button' id='signup' onClick={() => setShowSignup(true)}>New User? Signup</button>
      </div>
      
    </div>
  )
};

export default Splash;

//username, email, password