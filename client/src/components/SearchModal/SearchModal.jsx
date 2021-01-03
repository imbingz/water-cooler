import React from 'react';
import { Modal, Button} from 'react-bootstrap';
// import { BsSearch, BsFillPersonFill } from 'react-icons/bs';

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
                <form onSubmit={(e) => {e.preventDefault(); console.log('handleSearch');}}>
                    <label htmlFor='search'></label>
                    <input id='search' name='search' placeholder='Search Friends...' type="text"/>
                    <Button variant="secondary" onClick={onHide}>
                        Search
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                    
            </Modal.Footer>
               
        </Modal>
    );
}

export default SearchModal;
