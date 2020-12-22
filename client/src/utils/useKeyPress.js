// no jsx code here 

import { useEffect } from 'react';

function useKeyPress(fn) {

    // the cb inside will only run either component changes or key pressed 
    useEffect(()=> {
        window.addEventListener('keydown', fn);

        //clear function which fires when the component is unmounted
        return () => window.removeEventListener('keydown', fn);
    }, [fn]);
}

export default useKeyPress;