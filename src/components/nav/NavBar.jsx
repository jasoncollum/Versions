import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/userManager';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './navbar.css';

const style = {
    color: 'rgb(238, 233, 226)'
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md" className="strap-nav fixed-top">
                    <NavbarBrand href="/" className="nav-brand" style={{ color: '#CDAB7C' }}>VERSIONS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="burger" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/" style={style}>Song List</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/" style={style}>New Song</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/" style={style}>Logout</NavLink>
                            </NavItem>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                  </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

            // Bootstrap Navboar - original
            // <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
            //     <h2>VERSIONS</h2>
            //     <ul className="nav nav-pills">
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/songList">Song List</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/songSetupForm">New Song</Link>
            //         </li>
            //         <li className="nav-item">
            //             <Link className="nav-link" to="/login" onClick={() => logout()}>Logout</Link>
            //         </li>
            //     </ul>
            // </nav>
        )
    }
}

export default NavBar