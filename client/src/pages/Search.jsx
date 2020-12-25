import React, { useEffect, useState } from 'react';
import SearchResults from '../components/SearchResults';
import SearchContext from '../utils/SearchContext';



const Search = () => {
    // * States
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userID, setUserID] = useState([]);

    // * Connect to DB with User's Search
    //  // We should be able to place this in a use effect, listening to changes in search query so we can pull results as users type; Partial matches in Mongo needs to work firsts
    const searchDB = async () => {
        try{
            const response = await fetch('/api/user/search', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search: searchQuery}),
                method: 'POST'
            });
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            if (!data.success) {
                window.alert('No match 😮');
                return;
            }
            // ** If Results Are Found, set State To Trigger SearchResults.jsx
            setSearchResults(data.query);
            console.log(data.query);
        } catch (err) {
            console.log({ err });
        }
    };

    // * Listen to Page Load To Get User ID from Local Storage
    //  // Should this happen/be stored in global context?
    useEffect(() => {
        const { _id } = JSON.parse(localStorage.getItem('USER'));
        setUserID(_id);
    }, []);


    return (
        <SearchContext.Provider value={{ searchResults, userID }}>
            <>
                <h1>This is the Search page</h1>
                {/* Should prolly put this in a component? Depends if we put the search in navbar or something */}
                <form>
                    <section>
                        <label htmlFor='search'>Search For Users: </label>
                        <input
                            placeholder='Search For Users'
                            type='search'
                            name='searchQuery'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        ></input>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                searchDB();
                            }} 
                        >Click Me</button>
                    </section>
                    <section>
                        <SearchResults/>
                    </section>
                </form>
            </>
        </SearchContext.Provider>
    );
};

export default Search;