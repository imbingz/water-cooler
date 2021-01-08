import React from 'react';


function Sprite({ image, data, position }) {
    //deconstructure the data passed
    const { y, x, h, w } = data;

    return (
        // set image position n size
        <>
            <div
                style={ {
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    height: `${h}px`,
                    width: `${w}px`,
                    backgroundImage: `url(${image})`,
                    backgroundPosition: ` -${x}px -${y}px`, 
                    backgroundRepeat: 'no-repeat',
                    zIndex: 10
                } }
            />

            <div
                style={ {
                    padding: '0px 30px',
                    zIndex: 10
                } }    
            >
            userName
            </div>

        </>
    );
}

export default Sprite;