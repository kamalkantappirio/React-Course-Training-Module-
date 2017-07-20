import React, { PropTypes } from 'react';
import classnames from 'classnames';

const AccountRow = ({ account }) => (

  <div className={classnames('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start')}>
    <div className={classnames('d-flex', 'w-100', 'justify-content-between')}>
      <h5 className="mb-1">
        Name: {account.name}
      </h5>
    </div>
    <div>
      <h7>
        Goals: {account.goals}
      </h7>

    </div>
  </div>

);

AccountRow.propTypes = {
  account: PropTypes.shape({})
};

AccountRow.defaultProps = {
  account: {}
};

export default AccountRow;
