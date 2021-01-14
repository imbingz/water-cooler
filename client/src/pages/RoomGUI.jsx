import React from 'react';
import { Container } from 'react-bootstrap';
import GameRPG from '../components/GUIComponents/GameRPG';

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
