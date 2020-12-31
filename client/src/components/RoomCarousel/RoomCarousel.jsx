import React, {useState} from 'react';
import {Carousel, Col} from 'react-bootstrap';
import roomStyles from '../../data/roomStyles';
import './RoomCarousel.css';




function RoomCarousel() {
   
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>


            {roomStyles.map(style => {
                return (
                    <Col xs={12} lg={5} md={6} className='pb-3' >
                        <Carousel.Item>
                            <h5 className='text-secondary text-center pb-3'> Choose A Room Style </h5>
                            <img
                                className="d-block w-100"
                                src={style.src}
                                alt={style.title}
                            />
                     
                            <h6 className='text-secondary text-center pt-3' >{style.title}</h6>
                     
                        </Carousel.Item>
                    </Col>
                );
            })}
        </Carousel>
    );
}

export default RoomCarousel;
