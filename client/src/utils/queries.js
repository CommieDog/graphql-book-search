import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
      username
      email
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