const { User } = require("../models");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const user = await User.findById(context.user._id);
            return user;
        },
        test: async () => {
            return "Test"
        }
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            const passwordMatches = await user.isCorrectPassword(args.password);
            if(!passwordMatches)
            {
                console.log("PasswordFailed!");
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
        saveBook: async (parent, args, context) => {
            const A = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: { bookId: args.bookId, authors: args.authors, description: args.description, title: args.title, image: args.image, link: args.link }} },
                { new: true, runValidators: true } // Very important, otherwise it sends back the old document!
            );
            return A;
        },
        removeBook: async (parent, args, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true } // Very important, otherwise it sends back the old document!
            );
            return user;
        }
    }
}

module.exports = resolvers;