import gql from 'graphql-tag';

export const getAuthorsQuery = gql`
  {
    authors{
      id
      name
    }
  }
`;

export const getBooksQuery = gql`
  {
    books{
      id
      name
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          id
          name
        }
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation(
    $name: String!,
    $genre: String!,
    $id: ID!
  ){
    addBook(
      name: $name,
      genre: $genre,
      authorID: $id
    ){
      name
      genre
      authorID
    }
  }
`;
