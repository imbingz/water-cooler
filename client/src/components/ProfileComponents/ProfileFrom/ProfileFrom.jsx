import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProfileFrom.css';
import userIcons from '../../../data/productionUserIcons';
import { useGlobalContext } from '../../../utils/GlobalContext';

const ProfileFrom = (props) => {
    const history = useHistory();
    const [{ USER }, dispatch ] = useGlobalContext();
    const [selectedImg, setSelectedImg] = useState('');
    const [showImg, setShowImg] = useState(false);

    const [ storedUser, setStoredUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email:'',
        imageSrc:''
    });
 
    //pre-fill the user info
    useEffect(() => {

        if (!USER) {
            return history.push('/login');
        } 

        // console.log('global USER inside useEffect is:', USER);

        setStoredUser(USER);
        setSelectedImg(USER.imageSrc);
     
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //handle Profile Input Change
    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setStoredUser({...storedUser, [name]:value});
    };

    // Handle update profile button click 
    const updateProfile = async e => {
        e.preventDefault();

        const user = {
            _id: USER._id,
            firstName: storedUser.firstName,
            lastName: storedUser.lastName,
            username: storedUser.username,
            email: storedUser.email,
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

            //Check if return data is successful first
            if (data.user) {

                localStorage.setItem('USER', JSON.stringify(data.user));
                
                //update globalContext USER with updated returned data
                dispatch({ type: 'setUser', payload: data.user }); 
                
                //Notify user upon success update
                toast.success('Your profile is updated successfully!!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {
            //Notify user if error
            toast.error('Something went wrong! Try again later', {
                position: toast.POSITION.TOP_CENTER
            });
            console.error(error);
        }
    };

    return (
        <section className='Profile-user'>
            <form className='Profile-form' onSubmit={updateProfile}>
                <div className='Profile-img-group d-flex flex-column justify-content-center mr-4'>
                    <img className='Profile-image' 
                        src={selectedImg} 
                        alt='avarta' 
                    />
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
                            value={storedUser.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='lastName'>Last Name: </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={storedUser.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='username'>Username: </label>
                        <input
                            required
                            id='username'
                            name='username'
                            type='text'
                            value={storedUser.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            required
                            type='email'
                            id='email'
                            name='email'
                            value={storedUser.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className='Profile-update-btn' type='submit'>
                        Update Now
                    </button>
                </div>
            </form>
            <div className='d-flex flex-wrap justify-content-center mt-5 px-5'>
                {showImg && 
                    userIcons.map(image => (
                        <img key={image.id}
                            src={image.imageSrc} alt='default' className='Profile-image-options d-inline-block mr-2 mb-3'
                            onClick={()=>setSelectedImg(image.imageSrc)}
                        />
                    ))}
            </div>
        </section>
    );
};

export default ProfileFrom;