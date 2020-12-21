import React, { useState } from 'react';


// Might need to add a dropdown with option to search by name, username, or email, with default being username
const Search = () => {

    // const searchQuery = useRef();

    const [searchQuery, setSearchQuery] = useState('');


    const searchDB = () => {
        
        try{
            const response = fetch('/api/user/search', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search: searchQuery}),
                method: 'POST'
            });
            console.log(response);
        } catch (err) {
            console.log({ err });
        }
    };

    // useEffect(() => {
    //     // console.log(searchQuery);
    //     // Move this into a functions. when searchQuery.length > 3, run the function
       
    // }, []);


    return (
        <>
            <h1>This is the Search page</h1>
            <form>
                <article>
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
                </article>
            </form>
        </>
    );
};

export default Search;