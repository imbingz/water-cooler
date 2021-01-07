import React, { useEffect, useState } from 'react';
import './ProfileBlocked.css';
// import friends from '../../data/friends';

const ProfileBlocked = (props) => {



    const [blocked, setBlocked] = useState([]);

    const showBlocked = () =>{
        const container = document.querySelector('#blocked');
        container.classList.remove('ProfBlock-hide');
        const button = document.querySelector('#btn');
        button.classList.add('ProfBlock-hide');
    };

    useEffect(() => {
        const checkDBArray = async (arr) => {
            try {
                const response = await fetch('/api/friends/arrays', {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: props.id, case: arr }),
                    method: 'POST'
                });

                const data = await response.json();
                // console.log(data.retUsers);
                setBlocked(data.retUsers);
            } catch (err) {
                console.log({ err });
            }
        };
        checkDBArray('blocked');
    }, [props.id]);

    return (

        <section className='ProfBlock-friends'>
            <button
                onClick={showBlocked}
                id="btn"
            >Show Blocked Users</button>
            <section id="blocked" className="ProfBlock-hide">
                <h3>Blocked Users</h3>
                {blocked.map((retUser, index) => (
                    <article className="ProfBlock-cont" key={index}>
                        <div className="ProfBlock-img-wrapper" key={index}>
                            <img className="ProfBlock-img"
                                src={retUser.imageSrc}
                                alt={retUser.username}
                            />
                        </div>
                        <div className="ProfBlock-info-wrapper">
                            <div className="ProfBlock-info">
                                <p><span>Username:</span> {retUser.username}</p>
                                <p><span>Name:</span> {retUser.firstName} {retUser.lastName}</p>
                            </div>
                            <button
                                className="ProfBlock-btn-group ProfBlock-btn-unfriend"
                                onClick={e => {
                                    e.preventDefault();
                                    console.log('block');
                                }}
                            >Unblock</button>
                        </div>
                    </article>
                ))}
            </section>
        </section>
    );
};

export default ProfileBlocked;