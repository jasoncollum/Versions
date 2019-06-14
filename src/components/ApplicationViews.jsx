import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import RequestForm from './request/RequestForm'
import RevisionForm from './revision/RevisionForm'
import SongList from './list/SongList'
// import VersionDetail from './list/VersionDetail'
import API from '../modules/API'

class ApplicationViews extends Component {

    state = {
        versions: [],
        requestFormObj: {}
    }

    createMasterObjects = (data) => {
        data.versions.map(version => {
            let filteredRequests = data.requests.filter(request => request.versionId === version.id)
            version.requests = filteredRequests
            let foundSong = data.songs.find(song => song.id === version.songId)
            version.song = foundSong
            let foundArtist = data.artists.find(artist => artist.id === foundSong.artistId)
            version.artist = foundArtist
        })
        return data.versions
    }

    getAllData = () => {
        const data = {}
        let newState = {}

        API.getAllArtists().then(allArtists => {
            data.artists = allArtists
        })
            .then(() => API.getAllSongs().then(allSongs => {
                data.songs = allSongs
            }))
            .then(() => API.getAllVersions().then(allVersions => {
                data.versions = allVersions
            }))
            .then(() => API.getAllRequests().then(allRequests => {
                data.requests = allRequests
            }))
            .then(() => this.createMasterObjects(data))
            .then((masterVersions) => newState.versions = masterVersions)
            .then(() => this.setState(newState)
            )
            .then(() => this.props.history.push('/songList'))
    }

    saveRequestForm = (artistObj, songObj, versionObj, requestArr) => {
        const reqFormObj = {}

        API.postArtist(artistObj)
            .then(artist => {
                reqFormObj.artist = artist
            })
            .then(() => {
                songObj.artistId = reqFormObj.artist.id
                return API.postSong(songObj)
                    .then(song => {
                        reqFormObj.song = song
                    })
            })
            .then(() => {
                versionObj.songId = reqFormObj.song.id
                return API.postVersion(versionObj)
                    .then(version => {
                        reqFormObj.version = version
                    })
            })
            .then(() => {
                let postedRequests = []
                requestArr.forEach(requestObj => {
                    requestObj.versionId = reqFormObj.version.id
                    API.postRequest(requestObj)
                        .then(request => {
                            postedRequests.push(request)
                        })
                })
                reqFormObj.requests = postedRequests
            })
            .then(() => this.setState({ requestFormObj: reqFormObj }))
            .then(() => this.props.history.push('/revisionForm'))
        // .then(() => this.getAllData())
    }

    // saveRevisionForm = () => {
    //     console.log('Revision Form')
    // }

    componentDidMount() {
        const data = {}
        let newState = {}

        API.getAllArtists().then(allArtists => {
            data.artists = allArtists
        })
            .then(() => API.getAllSongs().then(allSongs => {
                data.songs = allSongs
            }))
            .then(() => API.getAllVersions().then(allVersions => {
                data.versions = allVersions
            }))
            .then(() => API.getAllRequests().then(allRequests => {
                data.requests = allRequests
            }))
            .then(() => this.createMasterObjects(data))
            .then((masterVersions) => newState.versions = masterVersions)
            .then(() => this.setState(newState)
            )
    }


    render() {
        console.log(this.state)
        return (
            <div className="container app-view-container">
                <Route exact path="/songList" render={props => {
                    return <SongList
                        versions={this.state.versions}

                    />
                }} />
                <Route exact path="/songList/:versionId(\d+)" render={(props) => {
                    // if (this.isAuthenticated()) {
                    // Find the version with the id of the route parameter
                    let version = this.state.versions.find(version =>
                        version.id === parseInt(props.match.params.versionId))

                    // If the version wasn't found, create a default one
                    if (!version) {
                        version = { id: 404, versionNum: "Dog not found" }
                    }

                    // return <VersionDetail version={version} />
                    // } else {
                    //     return <Redirect to="/login" />
                    // }
                }} />

                <Route exact path="/requestForm" render={props => {
                    return <RequestForm
                        saveRequestForm={this.saveRequestForm}
                        {...props}
                    />
                }} />

                <Route exact path="/revisionForm" render={props => {
                    return <RevisionForm
                        requestFormObj={this.state.requestFormObj}
                        saveRevisionForm={this.saveRevisionForm} />
                }} />
            </div>
        )
    }
}

export default withRouter(ApplicationViews)