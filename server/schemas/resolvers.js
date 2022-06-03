const { User } = require("../models");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return await User.findById(args.id);
        },
        test: async () => {
            return "Test"
        }
    },
    Mutation: {
        login: async (parent, args) => {
            console.log(args);
            const user = await User.findOne({ email: args.email });
            const passwordMatches = await user.isCorrectPassword(args.password);
            if(!passwordMatches)
            {
                return null;
            }
            const token = signToken(user);
            return { token: token, user: user}
        },
        addUser: async (parent, args) => {
            const user = await User.create({ username: args.username, email: args.email, password: args.password });
            const token = signToken(user);
            return { token: token, user: user};
        },
        saveBook: async (parent, args) => {
            return User.findOneAndUpdate(
                { _id: args.user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true } // Very important, otherwise it sends back the old document!
            );
        },
        removeBook: async (parent, args) => {
            return User.findOneAndUpdate(
                { _id: args.user._id },
                { $pull: { savedBooks: { bookId: args.params.bookId } } },
                { new: true } // Very important, otherwise it sends back the old document!
            );
        }
    }
}

module.exports = resolvers;