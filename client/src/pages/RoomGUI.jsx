import React from 'react';
import { Container } from 'react-bootstrap';
import GameRPG from './depreciated/GameRPG';
import './RoomGUI.css';

function RoomGUI() {
    return (    
        <Container className='d-flex justify-content-center'>
            <section className='RoomGUI-gui-section'>
                <GameRPG />
            </section>
        </Container>
    );
}

export default RoomGUI;
