import React from 'react';
import { Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';



function Loading() {
    return (
        <Container className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: 250}}>

            <h2>Tired of Zoom? </h2>
            <h2 className='mb-5' style={{fontFamily: 'Audiowide', color:'orangered'}}>Try WaterCooler</h2>
            <Loader type="Circles" color="#00BFFF" height={150} width={150} />

        </Container>
    );
}

export default Loading;
