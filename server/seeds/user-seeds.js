require('../config/db')();

const db = require('../models');

const idArray = [];

db.User.insertMany([
    {
        email: 'ishtarsink@venus.com',
        password: 'vaultofglass',
        username: 'Atheon',
        firstName: 'Atheon',
        lastName: 'Times-Conflux',
        status: 0,
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://i.imgur.com/izGw0wB.jpg',
    },
    {
        email: 'oceanofstorms@moon.com',
        password: 'crotasend',
        username: 'Scrota',
        firstName: 'Crota',
        lastName: 'Son-of-Oryx',
        status: 0,
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://cdn130.picsart.com/246483773027202.jpg?type=webp&to=crop&r=256',
    },
    {
        email: 'dreadnaught@saturn.com',
        password: 'kingsfall',
        username: 'Auryx',
        firstName: 'Oryx',
        lastName: 'The-Taken-King',
        status: 0,
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://pm1.narvii.com/6336/2169b35340c8109de7460b985874c375bf1dc244_128.jpg',
    },
    {
        email: 'dreadnaught7@saturn.com',
        password: 'kingsfalls',
        username: 'Auryous',
        firstName: 'Oryx-Raid',
        lastName: 'The-King',
        status: 0,
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://styles.redditmedia.com/t5_2tmtib/styles/profileIcon_pcmjnyopxm851.png?width=256&height=256&crop=256:256,smart&frame=1&s=868d500bf8180ecdc516e2a8fab4f66536a894b0',
    },
    {
        email: 'plaguelands@earth.com',
        password: 'wrathofthemachine',
        username: 'Spider',
        firstName: 'Aksis',
        lastName: 'Archon-Prime',
        status: 0,
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://i.pinimg.com/originals/6a/78/f7/6a78f73a95511beb19cb7da69267e956.jpg',
    },
])
    .then(users => {
        console.log(users);
        const friendsArray = [];
        const inboundFriends = [];
        for (let i = 0; i < users.length; i++) {
            // Make Array To Add To Friends Array 
            if (i < 2) {
                const { _id } = users[i];
                friendsArray.push(_id);
            } else if (i > 2 && i < 4) {
                const { _id } = users[i];
                inboundFriends.push(_id);
            }
        }
        console.log({ friendsArray }, { inboundFriends });
        db.User.findOneAndUpdate({ username: 'Atheon' }, { $set: { friends: friendsArray } }, { new: true })
            .then(friend => console.log(friend));
        db.User.findOneAndUpdate({ username: 'Atheon' }, { $set: { inboundPendingFriends: friendsArray } }, { new: true })
            .then(inbound => console.log(inbound));
    });


// const addFriends = () => {
//     db.User.find({ $text: { $search: 'Oryx' } })
//         .then(users => {
//             users.forEach(usersRaw => {
//                 let { id } = usersRaw;
//                 idArray.push(id);
//             });
//             db.User.findOneAndUpdate({ username: 'Atheon' }, { $addToSet: idArray });
//         });
// };