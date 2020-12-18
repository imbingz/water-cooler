import React, { useState, useEffect } from 'react';


// Might need to add a dropdown with option to search by name, username, or email, with default being username
const Search = () => {

    // const searchQuery = useRef();

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        // console.log(searchQuery);
        // Move this into a functions. when searchQuery.length > 3, run the function
        try{
            const response = fetch(
                '/api/user/search',
                {
                    body: "Diegopie",
                    method: 'POST'
                }
            );
            console.log(response);
        } catch (err) {
            console.log({ err })
        }

    }, [searchQuery])



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
                </article>
            </form>
        </>
    );
};

export default Search;