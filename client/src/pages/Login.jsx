import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleLogin = async e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		// ***  DELETE CONSOLE LOG LATER ****//
		console.log(email, password);

		try {
			const response = await fetch('/api/user/login', {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				}),
				method: 'POST'
			});

			const json = await response.json();

			if (json.error) {
				console.log(json.error);
				// *** NEED TO GET A BETTER WAY THAN ALERT TO NOTIFY USER **** //
				alert('Password and Email do not match');
				emailRef.current.value = '';
				passwordRef.current.value = '';
				emailRef.current.focus();
				return;
			}

			history.push('/room');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main>
			<form className='Login-form' onSubmit={handleLogin}>
				<div className='Login-form-group'>
					<label htmlFor='email'>Email: </label>
					<input required type='email' id='email' name='email' ref={emailRef} />
				</div>
				<div className='Login-form-group'>
					<label htmlFor='password'>Password: </label>
					<input required type='password' id='password' name='password' ref={passwordRef} />
				</div>
				<button type='submit'>Log In</button>
			</form>
			<p>
				Don't have an account?
				<Link to='/signup'> SignUp Here </Link>
			</p>
			{/* May need to add reset password link later ??  */}
		</main>
	);
};

export default Login;
