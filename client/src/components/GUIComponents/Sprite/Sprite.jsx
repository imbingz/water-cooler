import React, { useState, useRef } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

function Sprite({position, message, step=0, dir=0}) {

    // For popover button
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
   

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
                    backgroundPosition: `-${step*32}px -${step*32}px`,
                    backgroundRepeat: 'no-repeat',
                    zIndex: 100,
                } }
            >
                
                <div
                    style={ {
                        padding: '0px 30px',
                        zIndex: 100
                    } }    
                >
                    userName
                 
                </div>

                {
                    message && (
                        <div ref={ref}>
                            <Button onClick={handleClick}>{message}</Button>

                            <Overlay
                                show={show}
                                target={target}
                                placement="bottom"
                                container={ref.current}
                                containerPadding={20}
                            >
                                <Popover id="popover-contained">
                                    <Popover.Title>
                                        <Button variant='secondary' size='sm'>Maybe later</Button>
                                    </Popover.Title>
                                    <Popover.Content>
                                        <Button variant='warning' size='sm'>Yes, ready 😇 </Button> 
                                    </Popover.Content>
                                </Popover>
                            </Overlay>
                        </div>
                    ) 
                }
               
            </div>  
        </>
    );
}

export default Sprite;