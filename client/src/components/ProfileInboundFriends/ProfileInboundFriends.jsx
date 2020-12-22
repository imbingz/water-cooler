import React, { useEffect, useState } from 'react';
// import ProfileInbFriendsResults from '../ProfileInbFriendsResults';
// import ProfileContext from '../../utils/ProfileContext';

const ProfileInboundFriends = (props) => {

    // console.log(props.id);

    const [inboundFriends, setInboundFriends] = useState([]);
    const [displayResults, setDisplayResults] = useState();

    console.log(typeof (inboundFriends));
    console.log(inboundFriends);
    // * Send userId to Server and Check inboundPendingFriends


    const renderResults = () => {
        const results = 
        inboundFriends.map((user, index) => (
            <div className="ProfInbFrie-cont" key={index}>
                <img className="ProfInbFrie-img"
                    src={user.imageSrc}
                    alt="user's profile icon"
                />
                <h3>Username: {user.username}</h3>
                <h3>Name: {user.firstName} {user.lastName}</h3>
                {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                <button

                >Accept Friend Request</button>
            </div>
        ));
        console.log(results);
        setDisplayResults(results);
    };



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
                console.log(typeof (data.friends));
                setInboundFriends(data.friends);
                renderResults();
            } catch (err) {
                console.log({ err });
            }
        };
        checkFriendReqs();
    }, [props.id, setInboundFriends]);


    return (
        <article>
            <h1>Blah</h1>
            <>{displayResults}</>
        </article>
    );
};

export default ProfileInboundFriends;