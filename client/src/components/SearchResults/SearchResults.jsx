import React from 'react';
import './SearchResults.css';
import SearchButton from '../SearchButton';
import SearchContext from '../../utils/SearchContext';

const SearchResults = () => { 

    // move the context wrapper to where SearchResults is called

    return (
        <SearchContext.Consumer>
            {(context) => {
                console.log({context});
                return (
                    // * Map Through Users Returned From the DB
                    context.searchResults.map((returnedUser) => (
                        <article className='SearchResults-cont' key={Math.random()}>
                            <div>   
                                <img className="SearchResults-img"
                                    src={returnedUser.imageSrc}
                                    alt={returnedUser.username}
                                />
                            </div>
                            <div className='mx-3 pt-3' style={{width:200}}>
                                <p className='m-0 p-0'><strong>Username: </strong>{returnedUser.username}</p>
                                <p><strong>Name: </strong>{returnedUser.firstName} {returnedUser.lastName}</p>
                            </div>
                            {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                            <SearchButton
                                searchDB={context.searchDB}
                                pending={returnedUser.pending}  
                                blocked={returnedUser.blocked}
                                friends={returnedUser.friends}
                                friendId={returnedUser.friendId}
                                // We can deleted this to use global context in search button
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