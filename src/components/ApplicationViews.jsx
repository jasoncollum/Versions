import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RequestForm from './request/RequestForm'
import SongList from './list/SongList'
import dbCalls from '../modules/dbCalls'

class ApplicationViews extends Component {

    state = {
        song: {},
        versions: [],
        requests: []
    }

    componentDidMount() {
        const newState = {}

        dbCalls.getSong(1).then(song => {
            newState.song = song
        })
            .then(() => dbCalls.getVersion(newState.song.id)
                .then(versions => {
                    console.log(versions)
                    newState.versions = versions
                }))
            .then(() => dbCalls.getRequests(1)
                .then(requests => {
                    newState.requests = requests
                }))
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <div className="container app-view-container">
                <Route exact path="/songList" render={props => {
                    return <SongList
                        song={this.state.song}
                        versions={this.state.versions}
                    />
                }} />

                <Route exact path="/requestForm" render={props => {
                    return <RequestForm
                        song={this.state.song}
                        versions={this.state.versions}
                        requests={this.state.requests} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews