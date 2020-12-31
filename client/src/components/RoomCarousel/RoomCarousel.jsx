import React, {useState} from 'react';
import {Carousel} from 'react-bootstrap';
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
                    
                    <Carousel.Item>
                        <h5 className='text-secondary text-center pb-3'> Choose A Room Style </h5>
                        <img
                            className="d-block w-100"
                            src={style.src}
                            alt={style.title}
                        />
                     
                        <h6 className='text-secondary text-center pt-3' >{style.title}</h6>
                     
                    </Carousel.Item>
                
                );
            })}
        </Carousel>
    );
}

export default RoomCarousel;
