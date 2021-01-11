import React, { useState } from 'react';


export const validateInput = (str = '') => str.includes('@');


const Login = ({handleLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <main>
            <form className='Login-form' onSubmit={handleLogin} data-testid="form">
                <div className='Login-form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input required type='email' id='email' name='email' value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* simulate input 'email' type validation */}
                {email && !validateInput(email) ? <p>Email not valid</p> : null }

                <div className='Login-form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input required type='password' id='password' name='password' value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Log In</button>
            </form>
        </main>
    );
};

export default Login;
