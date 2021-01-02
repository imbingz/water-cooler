import React from 'react';
import './TabFriends.css';
import {Button} from 'react-bootstrap';
import friends from '../../data/friends';
import friendsRoom from '../../data/friendsRoom';
import {v4 as uuidv4} from 'uuid';
// import {ImCheckboxChecked} from 'react-icons/im';
// import {AiOutlineCloseCircle} from 'react-icons/ai';


function TabFriends() {
    return (
        <div className='mx-3 mt-3'>
            <section className='d-flex flex-column justify-content-start'>
                <div className='d-flex justify-content-start'>
                    <h6 className='mr-5'>Invitations:</h6> 
                    <small className='ml-5 text-success '>Accept</small>  
                    <small className='ml-4 text-danger'>Decline</small>  
                </div>
                
                 
                { friends &&
                    friends.slice(0,3).map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                            <p className='mx-2' >friend request</p>
                            <input className='d-inline-block mx-5' style={{width: 18, height: 18}} type="radio" name={friend.id} value="accept" />
                            <input style={{width: 18, height: 18}} type="radio" name={friend.id} value="decline"/>
                            {/* <button className='mx-5 TabFriends-check-btn' onClick={()=>console.log('accepted req')}><ImCheckboxChecked size={20} style={ { fill: 'blue' } }/></button>
                            <button className='TabFriends-check-btn'><AiOutlineCloseCircle size={25} style={ { fill: 'red' } }/></button> */}
                        </div>
                           
                    ))
                }
              
                { friendsRoom &&
                    friendsRoom.slice(0,2).map(friendRoom => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friendRoom.roomStyle} alt={friendRoom.roomname} style={{width:32, height: 32}}/>
                            <p className='ml-2 mr-4' >Room Invite</p>
                            <input className='d-inline-block mx-5' style={{width: 18, height: 18}} type="radio" name={friendRoom.roomname} value="accept" />
                            <input style={{width: 18, height: 18}} type="radio" name={friendRoom.roomname} value="decline"/>
                           
                        </div>
                           
                    ))
                }
              
            </section>
            <section className='mt-4 mr-3'>
                <h6>Online Friends:</h6>
                { friends &&
                    friends.slice(0,3).map(friend => (
                        <div className='d-flex flex-row justify-content-start' key={uuidv4()}>  
                            <img src={friend.imageSrc} alt={friend.username} style={{width:32, height: 32}}/>
                            <p className='mx-2' >{friend.username}</p>
                            <button className='TabFriends-profile-btn d-inline-block ml-auto mb-3 px-2 py-1'><small> View Profile</small> </button>
                        </div>
                           
                    ))
                }
            </section>
            <section>
                <h6>offiline Friends:</h6>
                <div className='d-flex flex-row justify-content-start'>    
                    <p>Frnd img</p>
                    <p>Frnd username</p>
                    <button>View Profile</button> 
                </div>
            </section>
        </div>
    );
}

export default TabFriends;
