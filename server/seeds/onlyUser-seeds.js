require('../config/db')();

const db = require('../models');

db.User.insertMany([
    {
        email: 'ishtarsink@venus.com',
        password: 'vaultofglass',
        username: 'Atheon',
        firstName: 'Atheon',
        lastName: 'Times-Conflux',
        status: 0,
        inboundPendingRooms: [],
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
        inboundPendingRooms: [],
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
        inboundPendingRooms: [],
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
        inboundPendingRooms: [],
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
        inboundPendingRooms: [],
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://i.pinimg.com/originals/6a/78/f7/6a78f73a95511beb19cb7da69267e956.jpg',
    },
]);
// * Add Id Values to Username: Spider's Friend array and Inbound Array
// .then(users => {
//     // console.log(users);
//     const friendsArray = [];
//     const inboundFriends = [];
//     for (let i = 0; i < users.length; i++) {

//         // * Queue First Two Users for spider's friends
//         if (i < 2) {
//             const { _id } = users[i];
//             friendsArray.push(_id);

//             // * Queue Third User for spider's inbound
//         } else if (i > 2 && i < 4) {
//             const { _id } = users[i];
//             inboundFriends.push(_id);
//         }
//     }
//     // console.log({ friendsArray }, { inboundFriends });

//     // ** Add First Two Users to spider's friends { note: for simplicity's sake, comment out the lone .then()s and comment in the .then(var)s with console.logs if you need to see what's happening }
//     db.User.findOneAndUpdate({ username: 'Spider' }, { $set: { friends: friendsArray } }, { new: true })
//         // *** Add Spider to First Two User'S Friends
//         .then(spider => {
//             db.User.findOneAndUpdate({ _id: friendsArray[0] }, { $push: { friends: spider._id } }, { new: true })
//                 .then()
//             // .then(first => {
//             //     console.log({first});
//             // })
//             ;
//             db.User.findOneAndUpdate({ _id: friendsArray[1] }, { $push: { friends: spider._id } }, { new: true })
//                 .then()
//             // .then(second => {
//             //     console.log({second});
//             // })
//             ;
//         });
//     // ** Add Third User to spider's inbound
//     db.User.findOneAndUpdate({ username: 'Spider' }, { $set: { inboundPendingFriends: inboundFriends } }, { new: true })
//         // *** Add spider to third user's inbound
//         .then((spider) => {
//             db.User.findOneAndUpdate({ _id: inboundFriends[0] }, { $push: { outboundPendingFriends: spider._id } }, { new: true })
//                 .then()
//             // .then(first => {
//             //     console.log({first});
//             // })
//             ;
//         });
// });