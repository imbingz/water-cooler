import React from 'react';
import './SearchResults.css';
import SearchButton from '../SearchButton';
import SearchContext from '../../utils/SearchContext';

const SearchResults = () => {


    return (
        <SearchContext.Consumer>
            {(context) => {
                // console.log(context);
                return (
                    // * Map Through Users Returned From the DB
                    context.searchResults.map((returnedUser, index) => (
                        <article className='SearchResults-cont' key={index}>
                            {/* Im not sure how to get the alt text to show the username as well, it doesn't combine the variable and the string after it 🤷‍♀️ */}
                            <img className="SearchResults-img"
                                src={returnedUser.imageSrc}
                                alt="user's profile icon"
                            />
                            <h3>Username: {returnedUser.username}</h3>
                            <h3>Name: {returnedUser.firstName} {returnedUser.lastName}</h3>
                            {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                            <SearchButton
                                pending={returnedUser.pending}
                                blocked={returnedUser.blocked}
                                friends={returnedUser.friends}
                                friendId={returnedUser.friendId}
                                userId={context.userID}
                            />
                        </article>
                    ))
                );
            }}
        </SearchContext.Consumer>
    );
};

export default SearchResults;