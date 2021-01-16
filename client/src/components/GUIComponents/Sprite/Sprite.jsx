import React, { useState, useRef, useEffect } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';
import { useGlobalContext } from '../../../utils/GlobalContext';
import useSound from 'use-sound';

function Sprite({position, message, step = 0, dir = 0 }) {

    const [{ USER },] = useGlobalContext();
    //Sound play setup 
    const soundUrl = '/assets/hello.mp3';
    const [play, { stop }] = useSound(
        soundUrl,
        { volume: 0.5 }
    );

    // For popover button
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    // Play sound when message pops up
    useEffect(() => {
        if (message) {
            play();
        }
        return () => {
            stop();
        };
    }, [message, play, stop]);

    //Handle popover display
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        // set image position n size
        <>
            <div
                style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    height: '32px',
                    width: '32px',
                    backgroundImage: 'url(\'/sprites/skins/m2.png\')',
                    backgroundPosition: `-${step * 32}px -${step * 32}px`,
                    backgroundRepeat: 'no-repeat',
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        padding: '0px 30px',
                        zIndex: 100,
                    }}
                >
                    <strong
                        style={{ backgroundColor: 'white' }}
                    >
                        {USER.username}
                    </strong>
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