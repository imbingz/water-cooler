const db = require('../models');

const dbArray = {
    push: async (array, queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( 
                { _id: queryId },
                { $addToSet: { [array]: insertId } },
                { new: true }
            );

            if (!user) {
                throw new Error('User does not exist.');
            }
            
            return user;
        } catch (err) {
            console.log(array + ' Arr Push Error: ', err);
            return false;
        }
    },
    pull: async (array, queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( 
                { _id: queryId },
                { $pull: { [array]: insertId } },
                { new: true }
            );

            if (!user) {
                throw new Error('User does not exist.');
            }
            
            return user;
        } catch (err) {
            console.log(array + ' Arr Pull Error: ', err);
            return false;
        }
    }
};

exports.dbArray = dbArray;