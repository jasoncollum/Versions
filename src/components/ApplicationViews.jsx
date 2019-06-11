import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RequestForm from './request/RequestForm'
import SongList from './list/SongList'
import API from '../modules/API'

class ApplicationViews extends Component {

    state = {
        song: {},
        versions: [],
        requests: []
    }

    saveArtist = (artistObj) => {
        API.getArtist(artistObj.name)
            .then(artist => {
                if (artist.length > 0) {
                    return artist.id
                } else {
                    console.log(artistObj)
                    API.postArtist(artistObj)
                }
            })
    }

    componentDidMount() {
        const newState = {}

        API.getSong(1).then(song => {
            newState.song = song
        })
            .then(() => API.getVersion(newState.song.id)
                .then(versions => {
                    newState.versions = versions
                }))
            .then(() => API.getRequests(1)
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
                        requests={this.state.requests}
                        saveArtist={this.saveArtist} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews