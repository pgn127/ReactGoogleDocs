import React from 'react';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Directory</h1>
        <h2>Click a document or create a new one!</h2>
        <Link to='/new'>Create a new document</Link>
      </div>
    )
  }
};

export default Directory;
