import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Container, Modal } from 'react-bootstrap';
import SearchResults from '../../SearchComponents/SearchResults';
import SearchContext from '../../../utils/SearchContext';
import './SearchModal.css';

function SearchModal (props) {
    // * States
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ userID, setUserID ] = useState([]);

    // * Connect to DB with User's Search
    //  // We should be able to place this in a use effect, listening to changes in search query so we can pull results as users type; Partial matches in Mongo needs to work firsts
    const searchDB = async () => {
        try{
            const response = await fetch('/api/user/search', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({search: searchQuery}),
                method: 'POST'
            });
            const data = await response.json();
            if (!data.success) {
                window.alert('No match 😮');
                return;
            }
            // ** If Results Are Found, set State To Trigger SearchResults.jsx
            setSearchResults(data.query);
            // console.log(data.query);
            setSearchQuery('');

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
        <SearchContext.Provider value={{ searchResults, userID }}>
            <Modal {...props} backdrop='static' keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title />
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <form
                            className='SearchModal-form'
                            onSubmit={e => {
                                e.preventDefault();
                                console.log('handleSearch');
                            }}>
                            <div className='SearchModal-input-wrap'>
                                <label htmlFor='search'>
                                    <BsSearch size={15} style={{ fill: 'grey' }} />
                                </label>

                                <input
                                    className='SearchModal-input'
                                    required
                                    id='search'
                                    name='searchQuery'
                                    value={searchQuery}
                                    placeholder='Search For Users ...'
                                    type='text'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button 
                                className='SearchModal-btn' 
                                type='submit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    searchDB();
                                }} 
                            >
						Search
                            </button>
                        </form>
                        <section className='mt-5'>
                            <SearchResults/>
                        </section>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='SearchModal-footer' />
            </Modal>
        </SearchContext.Provider>
    );
}

export default SearchModal;
