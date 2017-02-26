// npm packages
import React, {Component} from 'react';
import Search from '../../components/search';

import Voted from '../../components/votes';

const Votes = () => {
  return (
    <div className="container">
      <h2>Questions more voted</h2>
      <Voted/>
    </div>
  );
}
export default Votes;
