
import { render, fireEvent } from '@testing-library/react';

import Login, { validateInput } from './Login';


describe('login describe statement', () => {
    //positive case
    test('validate function should pass on correct input', () => {
        const text = 'text@test.com';
        expect(validateInput(text)).toBe(true);
    });

    // Negative case 
    test('validate function should fail on incorrect input', () => {
        const text = 'text';
        expect(validateInput(text)).not.toBe(true);
    });

    // first make sure that the component is actually in the Doccument using getByText 
    test('login form should be in the document', () => {
        const { getByText } = render(<Login />);
        const emailLabel = getByText('Email:');
        const passwordLabel = getByText('Password:');
       
        //test if input element is in the Document
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
    });

    // makee sure that label and input are related with each other
    test('login email input should have a label' , () =>{
        const component = render(<Login />);
        const emailInput = component.getByLabelText('Email:');
        // check if there the email input is associated with a right label
        expect(emailInput.getAttribute('id')).toBe('email');
    });

    // makee sure that label and input are related with each other
    test('login password input should have a label' , () =>{
        const { getByLabelText } = render(<Login />);
        const passwordInput = getByLabelText('Password:');
        // check if there the email input is associated with a right label
        expect(passwordInput.getAttribute('id')).toBe('password');
    });

    test('email input should accept text', () => {
        const { getByLabelText, getByText } = render(<Login />);
        const emailInput = getByLabelText('Email:');
        expect(emailInput.value).toMatch('');
        fireEvent.change(emailInput, {target: {value: 'testing'}});
        expect(emailInput.value).toMatch('testing');

        const errorMessage = getByText('Email not valid');
        expect(errorMessage).toBeInTheDocument();

        //test if the right input type - email includes @
        fireEvent.change(emailInput,{target: {value: 'testing@'}});
        expect(errorMessage).not.toBeInTheDocument();
    });

    test('password input should accept text', () => {
        const { getByLabelText } = render(<Login />);
        const passwordInput = getByLabelText('Password:');
        expect(passwordInput.value).toMatch('');
        fireEvent.change(passwordInput, {target: {value: 'testing'}});
        expect(passwordInput.value).toMatch('testing');
    });

    test('should be able to submit form', () => {
        //use jest mock helper
        const handleLogin = jest.fn(() => console.log('mock was called'));
        const { getByText, getByTestId } = render(<Login handleLogin={handleLogin}/>);
        const LoginButton = getByText('Log In');
        expect(LoginButton).toBeInTheDocument();
        fireEvent.submit(getByTestId('form'));
        expect(handleLogin).toBeCalled();
    });
});