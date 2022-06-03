const { User } = require("../models");
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return await User.findById(args.id);
        }
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            const passwordMatches = await user.isCorrectPassword(args.password);
            if(!passwordMatches)
            {
                return null;
            }
            //TODO: Implement Auth
            return { token: {}, user: user}
        },
        addUser: async (parent, args) => {
            const user = await User.create({ username: args.username, email: args.email, password: args.password });
            //TODO: Implement Auth
            return { token: {}, user: user}
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