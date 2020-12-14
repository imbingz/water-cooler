import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleLogin = e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		fetch('/api/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password,
				email
			})
		})
			.then(response => {
				if (response) {
					response.json();
				}
			})
			.then(data => {
				if (data.error) {
					//**** Note: we may want to do some notification to user here instead of log error*****/
					console.log(data.error.message);
				} else {
					history.push('/room');
				}
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<main>
			<form className='Signup-form' onSubmit={handleLogin}>
				<div className='Signup-form-group'>
					<label htmlFor='email'>Email: </label>
					<input required type='email' id='email' name='email' ref={emailRef} />
				</div>
				<div className='Signup-form-group'>
					<label htmlFor='password'>Password: </label>
					<input required type='password' id='password' name='password' ref={passwordRef} />
				</div>
				<button type='submit'>Sign Up</button>
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
