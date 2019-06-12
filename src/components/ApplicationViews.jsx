import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RequestForm from './request/RequestForm'
import SongList from './list/SongList'
import API from '../modules/API'

class ApplicationViews extends Component {

    state = {
        artist: {},
        song: {},
        version: {},
        requests: []
    }

    saveRequestForm = (artistObj, songObj, versionObj, requestArr) => {
        const newState = {}

        API.postArtist(artistObj)
            .then(artist => {
                newState.artist = artist
            })
            .then(() => {
                songObj.artistId = newState.artist.id
                return API.postSong(songObj)
                    .then(song => {
                        newState.song = song
                    })
            })
            .then(() => {
                versionObj.songId = newState.song.id
                return API.postVersion(versionObj)
                    .then(version => {
                        newState.version = version
                    })
            })
            .then(() => {
                let postedRequests = []
                requestArr.forEach(requestObj => {
                    requestObj.versionId = newState.version.id
                    API.postRequest(requestObj)
                        .then(request => {
                            postedRequests.push(request)
                        })

                })
            })
            .then(() => this.setState(newState))
    }

    componentDidMount() {
        // const newState = {}

        // API.getSong(1).then(song => {
        //     newState.song = song
        // })
        //     .then(() => API.getVersion(newState.song.id)
        //         .then(versions => {
        //             newState.versions = versions
        //         }))
        //     .then(() => API.getRequests(1)
        //         .then(requests => {
        //             newState.requests = requests
        //         }))
        //     .then(() => this.setState(newState))
    }


    render() {
        return (
            <div className="container app-view-container">
                <Route exact path="/songList" render={props => {
                    return <SongList
                        song={this.state.song}
                        version={this.state.version}
                        requests={this.state.requests}
                    />
                }} />

                <Route exact path="/requestForm" render={props => {
                    return <RequestForm
                        song={this.state.song}
                        versions={this.state.versions}
                        requests={this.state.requests}
                        saveRequestForm={this.saveRequestForm} />
                }} />
            </div>
        )
    }
}

export default ApplicationViews