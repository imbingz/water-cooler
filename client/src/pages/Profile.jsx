import React from 'react';
// import ProfileInboundFriends from '../components/ProfileInboundFriends';
// import ProfileUserFriends from '../components/ProfileUserFriends';

// import ProfileBlocked from '../components/ProfileBlocked';
import ProfileForm from '../components/ProfileComponents/ProfileFrom';
import './css/Profile.css';


const Profile = () => {   

    // use global context stored from Login
    const storedUser = JSON.parse(localStorage.getItem('USER'));

    return (
        <section className='Profile'>  
            <ProfileForm
                storedUser={ storedUser }
            />
            {/* <ProfileBlocked
                id={ storedUser._id }
            />   */}
        </section>
    );
};

export default Profile;
