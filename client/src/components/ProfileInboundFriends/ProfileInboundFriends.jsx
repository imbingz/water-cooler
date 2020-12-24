import React, { useEffect, useState } from 'react';
import './ProfileInboundFriends.css';
// import ProfileInbFriendsResults from '../ProfileInbFriendsResults';
// import ProfileContext from '../../utils/ProfileContext';

const ProfileInboundFriends = (props) => {

    const [inboundFriends, setInboundFriends] = useState([]);

    // * Send User and Friend's IDs to Server To Process Accepting Friend Request
    const acceptRequest = async (id) => {
        try {
            const request = await fetch('/api/friends/accept', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: id, user: props.id }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                window.alert('Done it');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // * Send User and Friend's IDs to Server To Process Declining Friend Request
    const declineRequest = async (id) => {
        try {
            const request = await fetch('/api/friends/decline', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: id, user: props.id }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                window.alert('Done it');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    // * On Page Load, Send User Id to Server To Process User's Inbound Friend Reqs
    useEffect(() => {
        const checkFriendReqs = async () => {
            try {
                const response = await fetch('/api/friends/inpending', {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: props.id }),
                    method: 'POST'
                });

                const data = await response.json();
                // console.log(data);
                setInboundFriends(data.friends);
            } catch (err) {
                console.log({ err });
            }
        };
        checkFriendReqs();
    }, [props.id]);


    return (
        <article>
            <h1>Inbound Friend Requests</h1>
            {/* <>{displayResults}</> */}
            {inboundFriends.map((user, index) => (
                <div className="ProfInbFrie-cont" key={index}>
                    <img className="ProfInbFrie-img"
                        src={user.imageSrc}
                        alt="user's profile icon"
                    />
                    <h3>Username: {user.username}</h3>
                    <h3>Name: {user.firstName} {user.lastName}</h3>
                    {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                    <button
                        onClick={e => {
                            e.preventDefault();
                            acceptRequest(user.userID);
                        }}
                    >Accept Friend Request</button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            declineRequest(user.userID);
                        }}
                    >Decline Friend Request</button>
                </div>
            ))}
        </article>
    );
};

export default ProfileInboundFriends;