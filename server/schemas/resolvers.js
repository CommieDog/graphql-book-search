const { User } = require("../models");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log("me");
            console.log("WTF", context.user._id);
            const user = await User.findById(context.user._id);
            console.log(user);
            return user;
        },
        test: async () => {
            return "Test"
        }
    },
    Mutation: {
        login: async (parent, args) => {
            console.log("login");
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
            console.log("B", args.bookId, args.authors, args.description, args.title, args.image, args.link);
            const A = await User.findOneAndUpdate(
                { _id: context.user._id },
                //{ _id: "629a1f11301d6b143068f7a4" },
                { $addToSet: { savedBooks: { bookId: args.bookId, authors: args.authors, description: args.description, title: args.title, image: args.image, link: args.link }} },
                { new: true, runValidators: true } // Very important, otherwise it sends back the old document!
            );
            console.log("A", A);
            return A;
        },
        removeBook: async (parent, args, context) => {
            console.log("OMG");
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.params.bookId } } },
                { new: true } // Very important, otherwise it sends back the old document!
            );
        }
    }
}

module.exports = resolvers;