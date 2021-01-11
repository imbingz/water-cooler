import React from 'react';
import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

function ListRender(props) {
    if (!props.contacts || !props.contacts.length) {
        return <div>No contacts</div>;
    }
    return (
        <ul>
            {props.contacts.map(({username, id}) => (
                <li key={id} data-testid="contact-username">
                    {username}
                </li>
            ))}
        </ul>
    );
}

test('renders "no contacts" when there are no contacts', () => {
    const {getByText} = render(<ListRender />);
    expect(getByText(/no contacts/i)).toBeInTheDocument();
});

test('renders contacts', () => {
    const fakeContacts = [{id: 1, username: 'The-king'}, {id: 2, username: 'Oryx'}];
    const {getAllByTestId} = render(<ListRender contacts={fakeContacts} />);
    const contactNames = getAllByTestId('contact-username').map(li => li.textContent);
    const fakeContactNames = fakeContacts.map(c => c.username);
    expect(contactNames).toEqual(fakeContactNames);
});
