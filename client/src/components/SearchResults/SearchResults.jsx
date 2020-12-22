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
                    context.searchResults.map((user, index) => (
                        <article className='SearchResults-cont' key={index}>
                            {/* Im not sure how to get the alt text to show the username as well, it doesn't combine the variable and the string after it 🤷‍♀️ */}
                            <img className="SearchResults-img"
                                src={user.imageSrc}
                                alt="user's profile icon"
                            />
                            <h3>Username: {user.username}</h3>
                            <h3>Name: {user.firstName} {user.lastName}</h3>
                            {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                            <SearchButton
                                pending={user.pending}
                                invitedId={user.invitedId}
                                inviterId={context.userID}
                            />
                        </article>
                    ))
                );
            }}
        </SearchContext.Consumer>
    );
};

export default SearchResults;