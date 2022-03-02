const { User, Thought } = require('../models');



const resolvers = {
    Query: {
        // get thoughts by a username
        thoughts: async (parent, { username }) => {
            // use a ternary operator to check if username exists... if yes, set params to and object with a username key set to that value. If it doesn't return an empty object
            const params = username ? { username } : {};
            // return data in descending order with sort({ createdAt: -1 })
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // get thought by id
        thought: async (parent, {_id}) => {
            return Thought.findOne({_id});
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        }
    }
};

// export the resolvers
module.exports = resolvers