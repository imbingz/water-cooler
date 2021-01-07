import React from 'react';


function Sprite({position={x:0, y:0}, message, step=0, dir=0}) {

    return (
        // set image position n size
        <>
            <div
                style={ {
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    height: '32px',
                    width: '32px',
                    backgroundImage: 'url(\'/sprites/skins/m2.png\')',
                    // backgroundPosition: ` -${x}px -${y}px`, 
                    backgroundPosition: `-${step*32}px -${step*32}px`,
                    backgroundRepeat: 'no-repeat',
                    zIndex: 10,
                } }
            >
                
                <div
                    style={ {
                        padding: '0px 30px',
                        zIndex: 10
                    } }    
                >
                    userName
                 
                </div>

                <div
                    style={ {
                        position: 'absolute',
                        top: position.y + '20px',
                        left: position.x,
                        // padding: '0px 30px',
                        zIndex: 10
                    } }    
                >
                    <h6>{message}</h6>
                </div>
               
            </div>
        </>
    );
}

export default Sprite;