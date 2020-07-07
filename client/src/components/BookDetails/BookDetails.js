import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {getBookQuery} from '../../queries';

const BookDetails = ({selectedBook}) => {
  useEffect(() => {
    selectedBook && fetchBook({variables: {id: selectedBook}});
  },
  [selectedBook],
  );

  const [fetchBook, {loading, error, data}] = useLazyQuery(getBookQuery);

  const _renderBookDetails = () => {
    const {name, genre, author} = data.book;
    return (
      <>
        <h2>{name}</h2>
        <p>Genre: {genre}</p>
        <p>
          <span><b>Author:</b> {author.name}</span>
        &nbsp; &nbsp; | &nbsp; &nbsp;
          <span><b>Edad:</b> {author.age}</span>
        </p>
        <p>Books:</p>
        <ul>
          {
            author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))
          }
        </ul>
      </>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="book-details">
      { data && _renderBookDetails() }
    </div>
  );
};

export default BookDetails;
