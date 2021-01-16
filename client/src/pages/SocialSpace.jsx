import React, { useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const SocialSpace = () => {
    const [state, dispatch] = useGlobalContext();
    
    const socialSpacePageUrl = document.URL;
    let socialSpaceUrlId = socialSpacePageUrl.substring((socialSpacePageUrl.length) - 36);
    
    useEffect(() => {
        async function populateSocialSpace() {
            try {
                const response = await fetch(
                    '/api/socialspace/:id',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            publicSocialSpaceId: socialSpaceUrlId
                        }),
                        method: 'POST'
                    }
                );
                const json = await response.json();
                dispatch({ type: 'popOne', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        populateSocialSpace();
    }, [dispatch, socialSpaceUrlId]);
    return (
        <>
            <h1>This is the SocialSpace page</h1>
            <div>
                <h3>Room Info</h3>

                <ul id={state.currentSocialSpace._id} key={state.currentSocialSpace._id}>
                    <li>
                        Social Space Name: {state.currentSocialSpace.socialSpaceName}
                    </li>
                    <li>
                        Social Space ID: {state.currentSocialSpace._id}
                    </li>
                    <li>
                        Social Public ID: {state.currentSocialSpace.publicSocialSpaceId}
                    </li>
                    <li>
                        Room Public ID: {state.currentSocialSpace.publicRoomId}
                    </li>
                </ul>
            </div>
            <div>
                <h3>Chats</h3>
            </div>
        </>
    );
};

export default SocialSpace;