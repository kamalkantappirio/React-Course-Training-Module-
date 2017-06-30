import React, {Component} from "react";
import classnames from 'classnames';

class AccountRow extends Component {

    render() {
        const { account } = this.props;

        return (
            <button className={classnames('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start')}>
                <div className={classnames('d-flex', 'w-100', 'justify-content-between')}>
                    <h5 className="mb-1">{ account.Name }</h5>
                    <small className='align-item-end'>{ account.Industry }</small>
                </div>
                {
                    account.BillingAddress !== null && (
                        <p className="mb-1"> 
                            Address: <small>{ account.BillingAddress.street }</small>
                        </p>
                    )
                }
            </button>
        );
    }

}


export default AccountRow;