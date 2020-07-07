import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../../queries';

const initFormState = {
  name: '',
  genre: '',
  authorId: '',
};

const AddBook = (props) => {
  const [formState, setFormState] = useState(initFormState);
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(
      addBookMutation,
      {
        update(cache, {data: {addBook}}) {
          const {books} = cache.readQuery({query: getBooksQuery});
          cache.writeQuery({
            query: getBooksQuery,
            data: {books: books.concat([addBook])},
          });
        },
      },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error :)</p>;

  const _renderAuthors = () => (
    data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ))
  );

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormState({...formState, [key]: value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: formState.name,
        genre: formState.genre,
        id: formState.authorId,
      },
    });

    setFormState(initFormState);
  };

  return (
    <form id="add-book" onSubmit={onSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={onInputChange}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formState.genre}
          onChange={onInputChange}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          name="authorId"
          value={formState.authorId}
          onChange={onInputChange}
        >
          <option>Select author</option>
          { data && _renderAuthors() }
        </select>
      </div>
      <div className="field">
        <input type="submit" value="Add Book" />
      </div>
    </form>
  );
};

export default AddBook;
