// I use this in robo to reset my friends and outbound list for testing search and 
// invites, or anywhere that needs friends 😅

db.users.update(
    { _id: ObjectId('5ffe4594138b1f47b47b297c') },
    {
        $set:
            { friends: [
                '5ffe44e90d7aad355c48f71b',
                '5ffe44e90d7aad355c48f71c',
                '5ffe44e90d7aad355c48f71d'
            ] }
    },
    { new: true }

);

db.users.update(
    { _id: ObjectId('5ffe4594138b1f47b47b297c') },
    {
        $set:
            { outboundPendingFriends: [] }
    },
    { new: true }

);

db.users.update(
    { _id: ObjectId('5ffe4594138b1f47b47b297c') },
    {
        $set:
            { inboundPendingFriends: [
                '5ffe44e90d7aad355c48f71f',
                '5ffe44e90d7aad355c48f723',
            ] }
    },
    { new: true }

);