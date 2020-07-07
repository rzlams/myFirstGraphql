import React from 'react';

import BookList from '../BookList';
import AddBook from '../AddBook';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
});

function App(props) {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
