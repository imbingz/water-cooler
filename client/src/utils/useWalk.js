import {useState} from 'react';

// in our case maxSteps = 3
function useWalk(maxSteps) {
    const [position, setPos] = useState({x:0, y:0});
    //first state is to control the direction the character is facing
    const [dir, setDir] = useState(0);
    //next state is the animation steps - each step will move the animation frame one step forward n reset it to 0 when it gets to 3
    const [step, setStep] = useState();

    const directions = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    };

    const stepSize = 16;
    
    const modifier = {
        down: {x :0, y:stepSize},
        left: {x:-stepSize, y:0},
        right: {x:stepSize, y:0},
        up:{x:0, y:-stepSize}
    };

    //walk function
    function walk(dir) {
        console.log(dir);
        console.log(directions[dir]);
        //update states
        // setDir(dir)

        //convert dir from string to integer
        // setDir(directions[dir])

        setDir(prev => {
            //if dir the sprite is trying to walk now equals to prev dir
            if (directions[dir] === prev) {move(dir);}
            //if not, return the current dir back to the setter
            return directions[dir];
        });

        //computer uses 0 as start, if prev-step is grater than maxStep, set it back to 0, 0-1-2
        setStep(prev => prev < maxSteps - 1 ? prev + 1 : 0);
    }

    //move function
    function move(dir) {
        //use modifier to perform some math on the current x, y position to change the position which will then move the character
        setPos(prev => ({
            x: prev.x + modifier[dir].x,
            y: prev.y + modifier[dir].y,
        }));
    }

    // return variables and methods for other components to use them
    return {
        walk, dir, step, position
    };
}

export default useWalk;