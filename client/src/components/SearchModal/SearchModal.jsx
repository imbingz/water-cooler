import React from 'react';
import { Modal } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import './SearchModal.css';

function SearchModal(props) {
    const {onHide} = props;
    return (
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form 
                    className='SearchModal-form'
                    onSubmit={(e) => {e.preventDefault(); console.log('handleSearch');}}
                >
                    <div className='SearchModal-input-wrap'>
                        <label htmlFor='searchModal-input'>
                            < BsSearch size={ 15 } style={ { fill: 'grey' } } />
                        </label>
                
                        <input 
                            className='SearchModal-input'
                            required
                            id='searchModal-input' name='searchModal-input' placeholder='Search Friends...' type="text"
                        />
                    </div>
                    <button
                        className='SearchModal-btn'
                        type='submit'
                        onClick={onHide}
                    >
                        Search
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer className='SearchModal-footer'>
                    
            </Modal.Footer>
               
        </Modal>
    );
}

export default SearchModal;
