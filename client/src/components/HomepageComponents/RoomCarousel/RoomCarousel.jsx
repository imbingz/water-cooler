import React, {useState} from 'react';
import {Carousel, Col} from 'react-bootstrap';
import roomStyles from '../../../data/roomStyles';
// import { v4 as uuidv4 } from 'uuid';
import './RoomCarousel.css';




function RoomCarousel() {
   
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
  

    return (
        <Col xs={12} lg={5} md={6} className='pb-3' >   
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {
                    roomStyles.map((style, i) => (
                        <Carousel.Item key={i}>
                            <h3 className='text-center text-muted'>Choose A Room Style</h3>
                            <img
                                className="d-block w-100"
                                src={style.src}
                                alt={style.title}
                            />
                            {/* <Carousel.Caption> */}
                            <h4 className='text-center text-muted'>{style.title}</h4>
                            {/* </Carousel.Caption> */}
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </Col>
    );
}

export default RoomCarousel;
