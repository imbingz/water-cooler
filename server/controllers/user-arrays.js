const db = require('../models');

const dbArray = {
    push: async (array, queryId, insertId) => {
        // console.log(array, queryId, insertId);
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { [array]: insertId } },
                { new: true }
            );
            // console.log(user);
            return user;
        } catch (err) {
            console.log(array + ' Arr Push Error: ', err);
        }
    },
    pull: async (array, queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { [array]: insertId } },
                { new: true }
            );
            // console.log(user);
            return user;
        } catch (err) {
            console.log(array + ' Arr Pull Error: ', err);
        }
    }
};

exports.dbArray = dbArray;