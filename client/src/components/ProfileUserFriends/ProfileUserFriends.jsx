import React, { useEffect, useState } from 'react';
import './ProfileUserFriends.css';

const ProfileUserFriends = (props) => {

    const [friends, setFriends] = useState([]);

    // * Send User and Friend's IDs to Server To Process Accepting Friend Request
    const sendMessage = () => {
        console.log('sendMessage will definitely do something eventually');
    };

    // * Send User and Friend's IDs to Server To Process Unfriend Request
    const unfriend = async (id) => {
        try {
            const request = await fetch('/api/friends/unfriend', {
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

    // * On Page Load, Send User Id to Server To Process User's Inbound Friend Request
    useEffect(() => {
        const checkFriends = async () => {
            try {
                const response = await fetch('/api/friends/friends', {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: props.id }),
                    method: 'POST'
                });

                const data = await response.json();
                // console.log(data);
                setFriends(data.friends);
            } catch (err) {
                console.log({ err });
            }
        };
        checkFriends();
    }, [props.id]);


    return (
        <article>
            <h1>Friends</h1>
            {/* <>{displayResults}</> */}
            {friends.map((user, index) => (
                <div className="ProfUserFrie-cont" key={index}>
                    <img className="ProfUserFrie-img"
                        src={user.imageSrc}
                        alt="user's profile icon"
                    />
                    <h3>Username: {user.username}</h3>
                    <h3>Name: {user.firstName} {user.lastName}</h3>
                    {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                    <button
                        onClick={e => {
                            e.preventDefault();
                            sendMessage();
                        }}
                    >Send Message</button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            unfriend(user.userID);
                        }}
                    >Unfriend</button>
                </div>
            ))}
        </article>
    );


};

export default ProfileUserFriends;