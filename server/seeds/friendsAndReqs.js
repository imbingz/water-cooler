require('../config/db')();

const db = require('../models');

// * Paste Your ID in _ID
const makeAsync = async () => {

    try {


        // ** Store User IDs in Array
        const userIdArr = [];
        const users = await db.User.find({});
        users.forEach(user => {
            userIdArr.push(user._id);
        });

        // ** Populate Your Friends List
        await db.User.updateOne(
            { _id: '5ffe6ca45a1e3081b0b8c040' },
            {
                $set:
                {
                    friends: [
                        userIdArr[0],
                        userIdArr[1],
                        userIdArr[2]
                    ]
                }
            },
            { new: true }

        );

        // ** Reset Your Outbound Friend Reqs
        await db.User.updateOne(
            { _id: '5ffe6ca45a1e3081b0b8c040' },
            {
                $set:
                    { outboundPendingFriends: [] }
            },
            { new: true }

        );

        // ** Populate Your Inbound Friend Reqs
        await db.User.updateOne(
            { _id: '5ffe6ca45a1e3081b0b8c040' },
            {
                $set:
                {
                    inboundPendingFriends: [
                        userIdArr[3],
                        userIdArr[4]
                    ]
                }
            },
            { new: true }
        );

    } catch (err) {
        console.log(err);
    }
};

makeAsync();