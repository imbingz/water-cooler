import React from 'react';
import SearchButton from '../SearchButton';
import SearchContext from '../../utils/SearchContext';

const SearchResults = () => {

    // const friendRequest = async (id) => {
    //     console.log(id);
    //     try {
    //         const request = await fetch('/api/user/friends', {
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ invited: id, inviter: '5fe084c2ea6ea08764a64fc7' }),
    //             method: 'PUT'
    //         });
    //         const status = await request.json();
    //         console.log(status.success);
    //         if (status.success) {
    //             window.alert('Done it');
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };



    return (
        <SearchContext.Consumer>
            {(context) => {
                console.log(context);
                return (
                    context.searchResults.map((user, index) => (
                        <article key={index}>
                            <img src={user.imgSrc} alt=" user's profile icon" />
                            <h3>Username: {user.username}</h3>
                            <h3>Name: {user.firstName} {user.lastName}</h3>
                            <SearchButton pending={user.pending} id={user.ref} />
                            {/* <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    friendRequest(user.ref);
                                }}
                            >BAD Friend Request</button> */}
                        </article>
                    ))
                );
            }}
        </SearchContext.Consumer>
    );
};


export default SearchResults;