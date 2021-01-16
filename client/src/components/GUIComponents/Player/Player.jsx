import React, { useState } from 'react';
import Sprite from '../Sprite';
import { useSocketUse } from '../../../utils/SocketUseProvider';
import UseKeyPress from '../../../utils/useKeyPress';

function Player() {

    const { player, players, emitMovement } = useSocketUse();
    // const { pos, emitPos, message } = props;
    const [dir, setDir] = useState(0);
    const [step, setStep] = useState();
    const key = 123456;
    const pos = players[key];
    const emitPos = (pos) => {
        emitMovement(pos);
    };
    let message = 'hey fam';

    // {{Object.keys(players).map(key => {
    //     if (key === player.id) {
    //         return (
    //             <Player
    //                 pos={players[key]}
    //                 emitPos={pos => emitMovement(pos)}
    //                 message={players[key].message}
    //             />
    //         );
    //     }

    //     return (
    //         <Player pos={players[key]} />
    //     );
    // })

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3
    };
    const stepSize = 16;
    const maxSteps = 3;
    const modifier = {
        down: { x: 0, y: stepSize },
        left: { x: -stepSize, y: 0 },
        right: { x: stepSize, y: 0 },
        up: { x: 0, y: -stepSize }
    };

    //use custom hook for keydown event - pass fn
    if (emitPos) {
        UseKeyPress(e => {
            if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                walk(e.key.replace('Arrow', '').toLowerCase());
            }
            //prevent browser from scrolling when downarrow key pressed
            e.preventDefault();
        });
    }

    //walk function
    function walk(dir) {

        setDir(prev => {
            //if dir the sprite is trying to walk now equals to prev dir
            if (directions[dir] === prev) { move(dir); }
            //if not, return the current dir back to the setter
            return directions[dir];
        });

        // check direction first and set sprite  frame/step
        directions[dir] = directions[dir] < maxSteps ? directions[dir] : 0;
        setStep(directions[dir]);
    }

    //move function
    function move(dir) {
        //use modifier to perform some math on the current x, y position 
        //to change the position which will then move the character  
        emitPos({
            x: pos.x + modifier[dir].x,
            y: pos.y + modifier[dir].y,
        });

    }

    return (
        <div>
            <Sprite
                step={step}
                dir={dir}
                position={pos}
                message={message}
            />
        </div>
    );
}

export default Player;
