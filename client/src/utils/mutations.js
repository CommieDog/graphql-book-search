import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation addUser($book: BookInput) {
    addUser(book: $book) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation addUser($bookId: ID!) {
    addUser(bookId: $bookId) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;