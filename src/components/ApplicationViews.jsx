import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RequestForm from './RequestForm'

class ApplicationViews extends Component {
    render() {
        return (
            <div className="container app-view-container">
                <Route exact path="/requestForm" render={props => {
                    return <RequestForm />
                }} />
            </div>
        )
    }
}

export default ApplicationViews