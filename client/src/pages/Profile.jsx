import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Container} from 'react-bootstrap';
// import ProfileInboundFriends from '../components/ProfileInboundFriends';
// import ProfileUserFriends from '../components/ProfileUserFriends';
import './Profile.css';
import friends from '../data/friends';
import images from '../data/profileImages';

const Profile = props => {
    const history = useHistory();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();

    const [showAvatars, setShowAvatars] = useState(false);
    const [selectedImg, setSelectedImg] = useState('https://cdn130.picsart.com/246483773027202.jpg?type=webp&to=crop&r=256');

    // use global context stored from Login
    const storedUser = JSON.parse(localStorage.getItem('USER'));

    //pre-fill the user info
    useEffect(() => {
        // need to change here to global context stored from Login
        if ( !storedUser) {
            return history.push('/login');  
        } 

        firstNameRef.current.value = storedUser.firstName || '';
        lastNameRef.current.value = storedUser.lastName || '';
        usernameRef.current.value = storedUser.username || '';
        emailRef.current.value = storedUser.email || '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProfile = async e => {
        e.preventDefault();
        setShowAvatars(false);

        const user = {
            _id: storedUser._id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            imageSrc:selectedImg
        };

        try {
            const response = await fetch('/api/user/profile', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user
                }),
                method: 'PUT'
            });

            const data = await response.json();
            if (data.user) {
                console.log(data.user);
                // *** NEED A BETTER WAY TO REPLACE ALERT  *** //
                alert('Your profile is updated successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };

   

    return (
        <main className='Profile'>
            <section className='Profile-user'>  
                <Container>   
                    <form className='Profile-form' onSubmit={updateProfile}>
                        <div className='Profile-img-wrapper ml-2'>
                            <img className='Profile-image' src={selectedImg} alt='profile avarta' />
                            <button className='Profile-img-edit-btn' onClick={(e) => { e.preventDefault(); setShowAvatars(true);}}>Edit Photo</button >
                            {/* <input
                            type='file'
                            onChange={() => {
                                console.log('upload image later');
                            }}
                        />
                        <button
                            className='Profile-image-btn'
                            onClick={() => {
                                console.log('upload avarta later');
                            }}>
                            Upload
                        </button> */}
                        </div> 
                        <div className='Profile-input-group'>
                            <div className='Profile-form-group'>
                                <label htmlFor='firstName'>First Name: </label>
                                <input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    ref={firstNameRef}
                                />
                            </div>
                            <div className='Profile-form-group'>
                                <label htmlFor='lastName'>Last Name: </label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    ref={lastNameRef}
                       
                                />
                            </div>
                            <div className='Profile-form-group'>
                                <label htmlFor='username'>Username: </label>
                                <input
                                    required
                                    id='username'
                                    name='username'
                                    type='text'
                                    ref={usernameRef}
                                />
                            </div>
                            <div className='Profile-form-group'>
                                <label htmlFor='email'>Email: </label>
                                <input
                                    required
                                    type='email'
                                    id='email'
                                    name='email'
                                    ref={emailRef}
                                />
                            </div>
                            <button className='Profile-update-btn' type='submit'>
                        Update Now
                            </button>
                        </div>
                    </form>
                </Container>  
            </section>

            <section>
                {
                    showAvatars && 
                    <div className='d-flex flex-wrap justify-content-center mt-5 px-5'>
                        {images.map(image => (
                            <img key={image.id}
                                src={image.imageSrc} alt='default' className='Profile-image-options d-inline-block mr-2 mb-3'
                                onClick={()=>setSelectedImg(image.imageSrc)}
                            />
                        ))}
                    </div>
                }
            </section>

            
            {/* delete id prop once added in those components */}
            {/* {storedUser && <section>
                <ProfileInboundFriends id={ storedUser._id } />
                <ProfileUserFriends id={ storedUser._id } />
            </section> } */}
            <section className='Profile-user-friends'>
                <article>
                    <h3>Friends</h3>
                    {/* <>{displayResults}</> */ }
                    { friends.map((user) => (
                        <div className="ProfUserFrie-cont" key={ user.id }>
                            <div className="ProfUserFrie-img-wrapper">
                                <img className="ProfUserFrie-img"
                                    src={ user.imageSrc}
                                    alt={user.username}
                                />
                            </div>
                            <div className="ProfUserFrie-info-wrapper">
                                <div className="ProfUserFrie-info">
                                    <p><span>Username:</span> { user.username }</p>
                                    <p><span>Name:</span> { user.firstName } { user.lastName }</p>
                                </div>
                                <div>
                                    <button className="ProfUserFrie-btn-group"
                                        onClick={ e => {
                                            e.preventDefault();
                                            console.log('send friend msg');
                                        } }
                                    >Send Message</button>
                                    <button className="ProfUserFrie-btn-group"
                                        onClick={ e => {
                                            e.preventDefault();
                                            console.log('unfriend');
                                        } }
                                    >Unfriend</button>
                                </div>
                            </div>
                        </div>
                    )) }
                </article>
            </section>
                
        </main>
    );
};

export default Profile;
