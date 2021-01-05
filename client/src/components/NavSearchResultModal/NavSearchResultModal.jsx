import React from 'react';
import SearchResults from '../SearchResults';
import { Modal, Container} from 'react-bootstrap';
import './NavSearchResultModal.css';

function NavSearchResultModal(props) {
    return (
      
        <Modal {...props} backdrop='static' keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize:'1rem', fontWeight:500, color: '#777'}}>Search Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                   
                    <SearchResults/>
                    
                </Container>
            </Modal.Body>
            <Modal.Footer className='NavSearchResultModal-footer' />
        </Modal>
    );
}

export default NavSearchResultModal;
