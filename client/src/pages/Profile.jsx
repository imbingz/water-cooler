import React from 'react';
// import ProfileInboundFriends from '../components/ProfileInboundFriends';
// import ProfileUserFriends from '../components/ProfileUserFriends';
import './Profile.css';
import ProfileForm from '../components/ProfileFrom';
// import ProfileBlocked from '../components/ProfileBlocked';


const Profile = () => {   

    // use global context stored from Login
    const storedUser = JSON.parse(localStorage.getItem('USER'));

    return (
        <main className='Profile'>            
            <ProfileForm
                storedUser={ storedUser }
            />
            {/* <ProfileBlocked
                id={ storedUser._id }
            />   */}
        </main>
    );
};

export default Profile;
