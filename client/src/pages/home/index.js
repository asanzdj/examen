// npm packages
import React from 'react';
import MediaQuery from 'react-responsive';
import Search from '../../components/search';

// our packages
import {QuestionList, QuestionSingle} from '../../components/question';
import Order from '../../components/order';
import GoUp from '../../components/goUp';

const Home = () => (
  <div className="container">
    <Search />
    <Order />
    <GoUp />
    <MediaQuery query="(min-width: 992px)">
      {(matches) => {
        if (matches) {
          return <QuestionList />;
        } else {
          return <QuestionSingle />;
        }
      }}
    </MediaQuery>
  </div>
);

export default Home;
