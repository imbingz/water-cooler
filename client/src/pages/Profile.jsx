import React from 'react';
import ProfileForm from '../components/ProfileComponents/ProfileFrom';
import ProfileBlocked from '../components/ProfileComponents/ProfileBlocked';
import './css/Profile.css';


const Profile = () => {

    return (
        <section className='Profile'>  
            <ProfileForm
            />
            <ProfileBlocked/>
        </section>
    );
};

export default Profile;
