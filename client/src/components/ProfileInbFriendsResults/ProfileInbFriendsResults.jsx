import React from 'react';
import './ProfileInbFriendsResults.css';
import ProfileContext from '../../utils/ProfileContext';

const ProfileInbFriendsResults = () => {


    return (
        <ProfileContext.Consumer>
            {(context) => {
                // console.log(context);
                return (
                    <div></div>
                );
            }}
        </ProfileContext.Consumer>
    );
};

export default ProfileInbFriendsResults;