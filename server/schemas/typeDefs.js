const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        user(id: ID!): User
        login(email: String!, password: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!)
        saveBook(userId: ID!, book: Book!)
        deleteBook(userId: ID!, bookId: ID!)
    }
`;