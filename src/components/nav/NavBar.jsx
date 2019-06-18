import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/userManager';
import "bootstrap/dist/css/bootstrap.min.css"
import './navbar.css'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <h2>VERSIONS</h2>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/songList">Song List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/revisionForm">New Version</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={() => logout()}>Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar