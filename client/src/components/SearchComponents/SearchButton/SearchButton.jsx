import React from 'react';
import './SearchButton.css';

const SearchButton = (props) => {
    // * Send IDs of user and invited to server to make friend req
    const friendRequest = async (id) => {
        try {
            const request = await fetch('/api/friends/request', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friend: id, user: props.userId }),
                method: 'PUT'
            });
            const status = await request.json();
           
            if (!status.success) {
                console.log('server err');
            }
            
        } catch (err) {
            console.log({ err });
        }
    };
    // * Default Button To Render
    // change to dispatch and reducer for props
    // create state for the database values
    let button =
        <button  
            className='SearchButton-send SearchButton-btn'
            onClick={async e => {
                e.preventDefault();
                await friendRequest(props.friendId);
                props.searchDB();
            }}
        >Send Friend Request</button>;
    
    // * Check if User Has Already Sent a Request to Change Button Render
    props.pending.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-pend SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >Friend Request Pending</button>;
        }
    });

    // * Check if User is already Friends to Change Button Render
    props.friends.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >Message Friend</button>;
        }
    });

    // * Check User has Been Blocked by this Search to Change Button Render
    props.blocked.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >You have been blocked</button>;
        }
    });

    return (
        <> {button} </>

    );
};

export default SearchButton;