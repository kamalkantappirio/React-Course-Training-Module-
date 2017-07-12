import React from 'react';
import classnames from 'classnames';

const AccountRow = () => {
  const { account } = this.props;
  return (
    <button className={classnames('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start')}>
      <div className={classnames('d-flex', 'w-100', 'justify-content-between')}>
        <h5 className="mb-1">
          {account.Name}
        </h5>
        {/* <small className='align-item-end'>{ account.Id }</small>*/}
      </div>
    </button>
  );
};

export default AccountRow;
