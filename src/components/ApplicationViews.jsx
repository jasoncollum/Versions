import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RequestForm from './request/RequestForm'
// import RevisionForm from './revision/RevisionForm'
import SongList from './list/SongList'
import API from '../modules/API'

class ApplicationViews extends Component {

    state = {
        artists: [],
        songs: [],
        versions: [],
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

    // saveRevisionForm = () => {
    //     console.log('Revision Form')
    // }

    componentDidMount() {
        const newState = {}

        API.getAllArtists().then(allArtists => {
            newState.artists = allArtists
        })
            .then(() => API.getAllSongs().then(allSongs => {
                newState.songs = allSongs
            }))
            .then(() => API.getAllVersions().then(allVersions => {
                newState.versions = allVersions
            }))
            .then(() => API.getAllRequests().then(allRequests => {
                newState.requests = allRequests
            }))
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <div className="container app-view-container">
                <Route exact path="/songList" render={props => {
                    return <SongList
                        artists={this.state.artists}
                        songs={this.state.songs}
                        versions={this.state.versions}
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

                {/* <Route exact path="/revisionForm" render={props => {
                    return <RevisionForm
                        artist={this.state.artist}
                        song={this.state.song}
                        version={this.state.version}
                        request={this.state.request}
                        saveRevisionForm={this.saveRevisionForm} />
                }} /> */}
            </div>
        )
    }
}

export default ApplicationViews