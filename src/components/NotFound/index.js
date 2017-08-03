// src/components/NotFound/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

class NotFound extends Component {
  state = {};

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('NotFound', className)} {...props}>
        <h1>
                    404
                    <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}

NotFound.propTypes = {
  className: PropTypes.string.required
};

NotFound.defaultProps = {
  className: ''
};

export default NotFound;
