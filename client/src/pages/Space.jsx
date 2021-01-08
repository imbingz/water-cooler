import React, {useState} from 'react';
import {Container} from 'react-bootstrap';


function Space() {
    return (
        <Container>
            <section style={{backgroundColor:'lightgreen'}} className='Space-video-section mb-5'>
                <div style={{backgroundColor:'lightyellow'}} className='d-flex justify-content-center flex-wrap'>
                    <div className='p-3'>
                        <h6 className='text-muted'>The-King-Oryx</h6>
                        <video autoplay playsinline src='/assets/demo/temp-video.mp4' style={{width: 500}}></video>      
                    </div>
                    <div className='p-3'>
                        <h6 className='text-muted'>The-King-Oryx</h6>
                        <video autoplay playsinline src='/assets/demo/temp-video.mp4' style={{width: 500}}></video>      
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default Space;
