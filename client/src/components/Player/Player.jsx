import React from 'react';
import Actor from '../Actor';
import UseKeyPress from '../../utils/useKeyPress';
import useWalk from '../../utils/useWalk';

export default function Player({ skin }) {
    //destructure from use-walk hook returned values
    const { dir, step, walk, position } = useWalk(3);

    const data = {
        h: 32,
        w: 32
    };

    //use custom hook for keydown event - pass fn
    UseKeyPress(e => {
        console.log(e.key); 

        //invoke walk method imported from use-walk custom hook
        walk(e.key.replace('Arrow', '').toLowerCase());
        //prevent browser from scrolling when downarrow key pressed
        e.preventDefault();
        // }
    });

    return (
        <div>
            <Actor // sprite={ `/sprites/skins/m1.png` }  // data={ {h: 32,w: 32} }
                sprite={ `/sprites/skins/${skin}.png` }
                data={ data }
                step={ step }
                dir={ dir }
                position={ position }
            />
        </div>
    );
}
