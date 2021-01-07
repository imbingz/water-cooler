import React, { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import NavSearchResultModal from '../../NavSearchResultModal/NavSearchResultModal';
import SearchContext from '../../../utils/SearchContext';
import './NavSearch.css';

function NavSearch() {
    // * States
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userID, setUserID] = useState([]);

    //SearchResult Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     
    // * Connect to DB with User's Search
    //  // We should be able to place this in a use effect, listening to changes in search query so we can pull results as users type; Partial matches in Mongo needs to work firsts
    const searchDB = async () => {
        try{
            const response = await fetch('/api/user/search', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search: searchQuery}),
                method: 'POST'
            });
            console.log(searchQuery);
            const data = await response.json();
            if (!data.success) {
                window.alert('No match 😮');
                setSearchResults([]);
                return;
            }
            // ** If Results Are Found, set State To Trigger SearchResults.jsx
            setSearchResults(data.query);
            // console.log(data.query);
            // setSearchQuery('');
        } catch (err) {
            console.log({ err });
        }
    };

    // * Listen to Page Load To Get User ID from Local Storage
    //  // Should this happen/be stored in global context?
    useEffect(() => {
        if (localStorage.getItem('USER') !==null ) {
            const { _id } = JSON.parse(localStorage.getItem('USER'));
            setUserID(_id);
        }
    }, []);

    // const search = <SearchContext.Provider><Search/><SearchContextProvider>
    // add contexts to where the component is referenced

    return (
        <SearchContext.Provider value={{ searchResults, userID, searchDB }}>
            <div className='Header-search'>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    searchDB();
                    handleShow();
                }}>
                    <i> < BsSearch size={ 20 } style={ { fill: 'black' } } /></i>
                    <label htmlFor='search'></label>
                    <input 
                        id='search' 
                        name='search' 
                        placeholder='Search For Users ...' 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <NavSearchResultModal show={show} onHide={() => handleClose (false)} />    
                
            </div>
        </SearchContext.Provider>
    );
}

export default NavSearch;
