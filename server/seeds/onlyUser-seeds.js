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
        activeRoom: '',
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
        activeRoom: '',
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
        activeRoom: '',
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
        activeRoom: '',
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
        activeRoom: '',
    },
    {
        email: 'theleviathan@space.com',
        password: 'thelaviathan',
        username: 'Rich',
        firstName: 'Emperor',
        lastName: 'Calus',
        status: 0,
        inboundPendingRooms: [],
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://ih1.redbubble.net/image.929096986.4561/flat,128x128,075,t.jpg',
        activeRoom: '',
    },
    {
        email: 'theleviathanlairone@space.com',
        password: 'eaterofworlds',
        username: 'hydra',
        firstName: 'Argos',
        lastName: 'Planetary Core',
        status: 0,
        inboundPendingRooms: [],
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://styles.redditmedia.com/t5_2nldqk/styles/profileIcon_3pqa2kvec8y41.jpg?width=256&height=256&crop=256:256,smart&frame=1&s=0a3b3155427d6bc801c1f3faeff9e05a0c763ee3',
        activeRoom: '',
    },
    {
        email: 'theleviathanlairtwo@space.com',
        password: 'spireofstars',
        username: 'somecabal',
        firstName: 'Val Cauor',
        lastName: 'no name',
        status: 0,
        inboundPendingRooms: [],
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://pm1.narvii.com/6972/2ab62cf23ec6ed250485523fab9d26b1e4f74d43r1-356-512v2_128.jpg',
        activeRoom: '',
    },
    {
        email: 'dreamingcity@unknownspace.com',
        password: 'lastwish',
        username: 'Riven',
        firstName: 'Riven',
        lastName: 'Of a Thousand Voices',
        status: 0,
        inboundPendingRooms: [],
        inboundPendingFriends: [],
        outboundPendingFriends: [],
        friends: [],
        blocked: [],
        imageSrc: 'https://www.destinypedia.com/images/thumb/3/33/Riven_face.jpg/1200px-Riven_face.jpg',
        activeRoom: '',
    },
]);
