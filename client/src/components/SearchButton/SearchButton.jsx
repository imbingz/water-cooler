import React from 'react';
// import SearchContext from '../../utils/SearchContext';

const SearchButton = (props) => {
    console.log(props.pending);
    console.log(props.id);

    const friendRequest = async (id) => {
        console.log(id);
        try {
            const request = await fetch('/api/user/friends', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invited: id, inviter: '5fe084c2ea6ea08764a64fc7' }),
                method: 'PUT'
            });
            const status = await request.json();
            console.log(status.success);
            if (status.success) {
                window.alert('Done it');
            }
        } catch (err) {
            console.log(err);
        }
    };



    let button =
        <button
            onClick={e => {
                e.preventDefault();
                friendRequest(props.id);
            }}
        >Send Friend Request</button>;

    // So fun fact, forEach won't run if the array is empty :)
    props.pending.forEach(req => {
        console.log({ req });
        if (req === '5fe084c2ea6ea08764a64fc7') {
            console.log('Hit');
            button =
                <button
                    onClick={e => e.preventDefault()}
                >Friend Request Pending</button>;
        }
    });
    return (
        <> {button} </>

    );



};

export default SearchButton;