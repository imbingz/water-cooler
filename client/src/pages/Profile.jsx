import React, { useEffect, useRef } from 'react';

const Profile = props => {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const usernameRef = useRef();
	const emailRef = useRef();

	const storedUser = JSON.parse(localStorage.getItem('USER'));
	console.log('storedUser: ', storedUser);

	//prefill the user info
	useEffect(() => {
		if (!storedUser) return;
		firstNameRef.current.value = storedUser.firstName || '';
		lastNameRef.current.value = storedUser.lastName || '';
		usernameRef.current.value = storedUser.username || '';
		emailRef.current.value = storedUser.email || '';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmitForm = async e => {
		e.preventDefault();
		console.log('submit form');

		const user = {
			_id: storedUser._id,
			firstName: firstNameRef.current.value,
			lastName: lastNameRef.current.value,
			username: usernameRef.current.value,
			email: emailRef.current.value
		};

		try {
			const response = await fetch('/api/user/profile', {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user
				}),
				method: 'PATCH'
			});

			const json = await response.json();
			// console.log(json);
			if (json.user) {
				console.log(json.user);
				localStorage.clear();
				// *** NEED A BETTER WAY TO REPLACE ALERT  *** //
				alert('Your profile is updated successfully');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main>
			<form className='Profile-form' onSubmit={handleSubmitForm}>
				{/* <div className='Profile-form-group'>
					<img className='Profile-image' src='assets/images/avarta.png' alt='avarta' />
					<input
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
					</button>
				</div> */}
				<div className='Profile-form-group'>
					<label htmlFor='firstName'>First Name: </label>
					<input
						type='text'
						id='firstName'
						name='firstName'
						ref={firstNameRef}
						// value={user.firstName} onChange={handleInputChange}
					/>
				</div>
				<div className='Profile-form-group'>
					<label htmlFor='lastName'>Last Name: </label>
					<input
						type='text'
						id='lastName'
						name='lastName'
						// defaultValue={user.lastName}
						ref={lastNameRef}
						// value={user.lastName}
						// onChange={handleInputChange}
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
						// defaultValue={user.username}
						// value={user.username}
						// onChange={handleInputChange}
					/>
				</div>
				<div className='Profile-form-group'>
					<label htmlFor='email'>Email: </label>
					<input
						required
						type='email'
						id='email'
						name='email'
						// defaultValue={user.email}
						ref={emailRef}
						// value={user.email}
						// onChange={handleInputChange}
					/>
				</div>
				<button className='Profile-update-btn' type='submit'>
					Update Now
				</button>
			</form>
		</main>
	);
};

export default Profile;
