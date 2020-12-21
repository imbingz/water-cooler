import React, { useState } from 'react';
import SearchResults from '../components/Navbar/SearchResults';
import SearchContext from '../utils/SearchContext';


// Might need to add a dropdown with option to search by name, username, or email, with default being username
const Search = () => {

    // const searchQuery = useRef();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const searchDB = async () => {
        
        try{
            const response = await fetch('/api/user/search', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search: searchQuery}),
                method: 'POST'
            });
            // console.log(response);
            const data = await response.json();
            console.log(data.query);
            setSearchResults(data.query);
        } catch (err) {
            console.log({ err });
        }
    };

    // useEffect(() => {
    //     // console.log(searchQuery);
    //     // Move this into a functions. when searchQuery.length > 3, run the function
       
    // }, []);


    return (
        <SearchContext.Provider value={{ searchResults }}>
            <>
                <h1>This is the Search page</h1>
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