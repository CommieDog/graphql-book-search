import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    user {
      _id
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;