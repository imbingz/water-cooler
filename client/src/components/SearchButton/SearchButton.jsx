import React from 'react';
import './SearchButton.css';

const SearchButton = (props) => {
    // * Send IDs of user and invited to server to make friend req
    const friendRequest = async (id) => {
        try {
            const request = await fetch('/api/friends/req', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invited: id, user: props.userId }),
                method: 'PUT'
            });
            const status = await request.json();
            if (status.success) {
                window.alert('Done it');
            } else if (!status.success) {
                window.alert('Not Done it');
            }
        } catch (err) {
            console.log({ err });
        }
    };


    // * Default Button To Render
    let button =
        <button 
            className='SearchButton-send'
            onClick={e => {
                e.preventDefault();
                friendRequest(props.invitedId);
            }}
        >Send Friend Request</button>;
    
    // * Check if User Has Already Sent a Request
    props.pending.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-pend'
                    onClick={e => e.preventDefault()}
                >Friend Request Pending</button>;
        }
    });

    // * Check if User is already Friends
    props.friends.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg'
                    onClick={e => e.preventDefault()}
                >Message Friend</button>;
        }
    });

     // * Check User has Been Blocked by this Search
     props.blocked.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg'
                    onClick={e => e.preventDefault()}
                >You have been blocked</button>;
        }
    });

    return (
        <> {button} </>

    );
};

export default SearchButton;