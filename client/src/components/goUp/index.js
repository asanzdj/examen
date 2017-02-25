import React, {Component} from 'react';
import {connect} from 'react-redux';
const styles = require('./style.scss');

const GoUp = () => {
  const up = () => {
    scroll(0,0);
  }

  return (
    <button className={`btn btn-default ${styles.button}`} onClick={up}>
      <i className="glyphicon glyphicon-circle-arrow-up" />
    </button>
  );
}

export default connect (null, null)(GoUp);
