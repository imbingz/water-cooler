import React, { useEffect, useState } from 'react';
// import ProfileInbFriendsResults from '../ProfileInbFriendsResults';
// import ProfileContext from '../../utils/ProfileContext';

const ProfileInboundFriends = (props) => {

    // console.log(props.id);

    const [inboundFriends, setInboundFriends] = useState([]);

    console.log(typeof(inboundFriends));
    console.log(inboundFriends);
    // * Send userId to Server and Check inboundPendingFriends
    useEffect(() => {
        const checkFriendReqs = async () => {

            try {
                console.log();
                const response = await fetch('/api/user/friends/inpending', {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: props.id }),
                    method: 'POST'
                });

                const data = await response.json();
                console.log(data);
                console.log(data.friends);
                console.log(typeof(data.friends));
                setInboundFriends(data.friends);
            } catch (err) {
                console.log({ err });
            }
        };
        checkFriendReqs();
    }, [props.id, setInboundFriends]);


    return (
        <article>
            <h1>Blah</h1>
            

        </article>
    );
};

export default ProfileInboundFriends;