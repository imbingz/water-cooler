// I use this in robo to reset my friends and outbound list for testing search and 
// invites, or anywhere that needs friends 😅

db.users.update(
    { _id: ObjectId('5fe95ba00f314f7ed4fd4e8a') },
    {
        $set:
            { friends: [
                '5fea6c910d23ba0324c14d1a',
                '5fea6c910d23ba0324c14d19',
                '5fea6c910d23ba0324c14d18'
            ] }
    },
    { new: true }

);

db.users.update(
    { _id: ObjectId('5fe95ba00f314f7ed4fd4e8a') },
    {
        $set:
            { outboundPendingFriends: [] }
    },
    { new: true }

);

db.users.update(
    { _id: ObjectId('5fe95ba00f314f7ed4fd4e8a') },
    {
        $set:
            { inboundPendingFriends: [
                '5fea6c910d23ba0324c14d1a',
                '5fea6c910d23ba0324c14d19',
            ] }
    },
    { new: true }

);