import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getBooksQuery} from '../../queries';
import BookDetails from '../BookDetails';


const BookList = (props) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const {loading, data, error} = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const _renderBooks = () => (
    data.books.map((book) => (
      <li key={book.id} onClick={() => setSelectedBook(book.id)}>
        {book.name}
      </li>
    ))
  );

  return (
    <div>
      <BookDetails selectedBook={selectedBook}/>
      <ul className='book-list'>
        { data && _renderBooks() }
      </ul>
    </div>
  );
};

export default BookList;
