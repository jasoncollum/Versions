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
    NavItem
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

    closeMenu() {
        if (window.innerWidth <= 768) {
            this.toggle();
        }
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
                                <Link className="nav-link" to="/songList" style={style} onClick={() => this.closeMenu()}>Song List</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/songSetupForm" style={style} onClick={() => this.closeMenu()}>New Song</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/login" style={style} onClick={() => { logout(); this.closeMenu() }}>Logout</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar