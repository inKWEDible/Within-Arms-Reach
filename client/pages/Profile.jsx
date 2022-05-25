import React from 'react';
import MyItems from '../components/MyItems';
import MyProposals from '../components/MyProposals';


const Profile = () => {
  return (
      <>
        
       <h3>Profile</h3> 
        <div className='profile-columns'>
        <MyItems />
        <MyProposals />
        </div>
      </>
  )
}

export default Profile;