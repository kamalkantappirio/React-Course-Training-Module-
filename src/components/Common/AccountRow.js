import React, { PropTypes } from 'react';
import classnames from 'classnames';

const AccountRow = ({ account }) => (
  <button className={classnames('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start')}>
    <div className={classnames('d-flex', 'w-100', 'justify-content-between')}>
      <h5 className="mb-1">
        {account.Name}
      </h5>
      {/* <small className='align-item-end'>{ account.Id }</small>*/}
    </div>
  </button>
);

AccountRow.propTypes = {
  account: PropTypes.shape({})
};

AccountRow.defaultProps = {
  account: {}
};

export default AccountRow;
