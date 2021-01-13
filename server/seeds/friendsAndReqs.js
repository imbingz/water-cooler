require('../config/db')();
const db = require('../models');

const yourID = '5ffea425da62691020ad8352';
// * Paste Your ID in _ID
const makeAsync = async () => {

    try {
        // ** Store User IDs in Array
        const userIdArr = [];
        const users = await db.User.find({});
        users.forEach(user => {
            userIdArr.push(user._id.toString());
        });
        // console.log(userIdArr);

        // ** Populate Your Friends List
        await db.User.updateOne(
            { _id: yourID },
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

        // ** Place Your Id in Their Friends Array
        for(let i = 0; i < 3; i++) {
            await db.User.updateOne(
                { _id: userIdArr[i]},
                {
                    $set:
                    {
                        friends: [yourID]
                    }
                },
                { new: true }
    
            );
        }

        // ** Reset Your Outbound Friend Reqs
        await db.User.updateOne(
            { _id: yourID },
            {
                $set:
                    { outboundPendingFriends: [] }
            },
            { new: true }

        );

        // ** Populate Your Inbound Friend Reqs
        await db.User.updateOne(
            { _id: yourID },
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