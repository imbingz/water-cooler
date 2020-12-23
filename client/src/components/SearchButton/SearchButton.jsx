import React from 'react';
// import SearchContext from '../../utils/SearchContext';

const SearchButton = (props) => {
    // * Send IDs of user and invited to server to make friend req
    const friendRequest = async (id) => {
        try {
            const request = await fetch('/api/user/friends/req', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invited: id, user: props.userId }),
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


    // * Default Button To Render
    let button =
        <button
            onClick={e => {
                e.preventDefault();
                friendRequest(props.invitedId);
            }}
        >Send Friend Request</button>;
    
    // * Check if User Has Already Sent a Request { note: need to add another condition if they're already friends }
    //    // So fun fact, forEach won't run if the array is empty :)
    props.pending.forEach(invitedReqs => {
        if (invitedReqs === props.userId) {
            button =
                <button
                    onClick={e => e.preventDefault()}
                >Friend Request Pending</button>;
        }
    });
    return (
        <> {button} </>

    );
};

export default SearchButton;