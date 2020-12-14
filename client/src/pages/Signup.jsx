import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
	const history = useHistory();
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPass, setConfirmPass ] = useState('');

	const handleSignup = async e => {
		e.preventDefault();

		try {
			const response = await fetch('/api/user/signup', {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password,
					email
				}),
				method: 'POST'
			});
			const json = await response.json();

			//**** Note: we may want to do some notification to user here instead of log error  *****//
			if (json.data.error) console.log(json.data.error.message);

			history.push('/login');

			setUsername('');
			setEmail('');
			setPassword('');
			setConfirmPass('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main>
			<form className='Signup-form' onSubmit={handleSignup}>
				<div className='Signup-form-group'>
					<label htmlFor='username'>Username: </label>
					<input
						required
						id='username'
						name='username'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='Signup-form-group'>
					<label htmlFor='email'>Emai: </label>
					<input
						required
						type='email'
						id='email'
						name='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className='Signup-form-group'>
					<label htmlFor='password'>Password: </label>
					<input
						required
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='Signup-form-group'>
					<label htmlFor='confirmPass'>Confirm Password: </label>
					<input
						required
						type='password'
						id='confirmPass'
						name='confirmPass'
						value={confirmPass}
						onChange={e => setConfirmPass(e.target.value)}
					/>
					{password !== confirmPass ? <span style={{ color: 'tomato' }}> Passwords must match </span> : null}
				</div>
				<button type='submit'>Sign Up</button>
			</form>
			<p>
				Already have an account?
				<Link to='/login'> Login Here </Link>
			</p>
		</main>
	);
};

export default Signup;
