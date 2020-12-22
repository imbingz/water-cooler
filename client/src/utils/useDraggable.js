//event listener for the key pressed
import {useState, useEffect} from 'react';

// id passed here will be the id attri on the element we want to drag
function useDraggable(id) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
        const handle = document.getElementById('handle');
        //add multiple mouse eventlistener
        handle.addEventListener('mousedown', e => {
            //preevent event bubbling
            e.preventDefault();
            //enable smooth dragging
            handle.style.pointerEvents = 'none';

            //mouse move event
            document.body.addEventListener('mousemove', move);

            //mouse up event
            document.body.addEventListener('mouseup', () => {
                //stop moving the toolbar
                document.body.removeEventListener('mousemove', move);
                //reset the pointerevent back to iinitial
                handle.style.pointerEvent = 'initial';
            });
        });

        //clean up when component is unmounted
        return () => {
            document.body.removeEventListener('mousemove', move);
            document.body.removeEventListener('mousedown', move);
            document.body.removeEventListener('mouseup', move);
        };
    }, []);

    // actual mouse move function
    const move = e => {
        //x, y is the position of the mounse
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        //update mouse position
        setPosition(pos);
    };

    // make sure to return the position for other components to use
    return {
        position
    };

}

export default useDraggable;
