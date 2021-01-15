import React, {useState} from 'react';
import {Carousel } from 'react-bootstrap';
import features from '../../../data/productionFeatures';


function LandingCarousel() {
   
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
   

    return (
       
        <Carousel activeIndex={index} onSelect={handleSelect} >
           
            {
                features.map((feature, i) => (
                    <Carousel.Item key={i} interval={3000} >
                        <h3 className='text-center' style={{color:`${feature.color}` }}> {feature.title} </h3>
                        <img
                            className="d-block w-100"
                            src={feature.src}
                            alt={feature.title}
                            style={{width: '50%', maxWidth: 650}}
                        />
                        
                        <p className='text-center mt-3'> {feature.details} </p>
                                              
                    </Carousel.Item>
                ))
            }
        </Carousel>
     
    );
}

export default LandingCarousel;

