import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Button} from 'reactstrap';

class Header extends Component {

    render() {
        return (
            <div >
                <Navbar inverse>
                    <Nav />
                </Navbar>
            </div>
        );
    }
}

export default Header;
