// npm packages
import React from 'react';
import Search from '../../components/search';

// our packages
import Voted from '../../components/votes';

const Votes = () => (
  <div className="container">
    <h2>Questions more voted</h2>
    <Voted />
  </div>
);

export default Votes;
