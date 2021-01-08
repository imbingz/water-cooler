import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ProfileFrom.css';
import images from '../../../data/profileImages';

const ProfileFrom = (props) => {

    const [selectedImg, setSelectedImg] = useState('');
    const [showImg, setShowImg] = useState(false);

    const history = useHistory();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const imgRef=useRef();

  
    //pre-fill the user info
    useEffect(() => {
        // need to change here to global context stored from Login
        if (!props.storedUser) {
            return history.push('/login');
        }

        firstNameRef.current.value = props.storedUser.firstName || '';
        lastNameRef.current.value = props.storedUser.lastName || '';
        usernameRef.current.value = props.storedUser.username || '';
        emailRef.current.value = props.storedUser.email || '';
        imgRef.current.currentSource = props.storedUser.imageSrc || '';

        setSelectedImg(imgRef.current.currentSource);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProfile = async e => {
        e.preventDefault();

        const user = {
            _id: props.storedUser._id,
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
        <section className='Profile-user'>
            <form className='Profile-form' onSubmit={updateProfile}>
                <div className='Profile-img-group d-flex flex-column justify-content-center mr-4'>
                    <img className='Profile-image' ref={imgRef} src={selectedImg} alt='avarta' />
                    <button 
                        className='Profile-img-edit-btn' 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setShowImg(true);
                        }}
                    >
                         Edit Photo
                    </button >
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
            <div className='d-flex flex-wrap justify-content-center mt-5 px-5'>
                {showImg && 
                    images.map(image => (
                        <img key={image.id}
                            src={image.imageSrc} alt='default' className='Profile-image-options d-inline-block mr-2 mb-3'
                            onClick={()=>{setSelectedImg(image.imageSrc); console.log(image.imageSrc);}}
                        />
                    ))}
            </div>
        </section>
    );
};

export default ProfileFrom;