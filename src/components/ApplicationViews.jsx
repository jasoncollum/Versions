import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import Login from './Login';
import Register from './Register';
// import Home from './Home';
import { getUserFromLocalStorage, logout } from '../auth/userManager';
import RevisionForm from './revision/RevisionForm'
import SongList from './list/SongList'
import VersionDetail from './list/VersionDetail'
import API from '../modules/API'
import { promised } from 'q';

class ApplicationViews extends Component {

    state = {
        user: getUserFromLocalStorage(),
        versions: [],
        revisionFormObj: {}
    }

    deleteRevision = (revisionId) => {
        API.deleteRevision(revisionId)
    }

    deleteVersion = async (version_Id) => {
        const versionToDelete = this.state.versions.find(version => version.id === version_Id)
        // await versionToDelete.revisions.forEach(revision => API.deleteRevision(revision.id))
        await API.deleteVersion(versionToDelete.id)
        this.getAllData()
    }

    deleteSong = async (song_Id) => {
        // const revisionsToDelete = []
        const versionsToDelete = this.state.versions.filter(version => version.songId === song_Id)

        await versionsToDelete.map(version => {
            return API.deleteVersion(version.id)
        })

        await API.deleteSong(song_Id)
        this.getAllData()
    }

    createMasterObjects = (data) => {
        data.versions.map(version => {
            let filteredRevisions = data.revisions.filter(revision => revision.versionId === version.id)
            version.revisions = filteredRevisions
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
            .then(() => API.getAllRevisions().then(allRevisions => {
                data.revisions = allRevisions
            }))
            .then(() => this.createMasterObjects(data))
            .then((masterVersions) => {
                const userVersions = masterVersions.filter(version => version.song.userId === this.state.user.id)
                // console.log('USER VERSIONS', userVersions)
                newState.versions = userVersions
            })
            // .then((userVersions) => newState.version = userVersions)
            .then(() => this.setState(newState)
            )
        // .then(() => this.props.history.push('/songList'))
    }

    saveRevisionForm = async (artistObj, songObj, versionObj, revisionArr) => {
        // console.log('revisions array', revisionArr)
        const revFormObj = {}

        await API.postArtist(artistObj)
            .then(artist => {
                revFormObj.artist = artist
            })
        // .then(() => {
        songObj.artistId = revFormObj.artist.id
        await API.postSong(songObj)
            .then(song => {
                revFormObj.song = song
            })
        // })
        // .then(() => {
        versionObj.songId = revFormObj.song.id
        await API.postVersion(versionObj)
            .then(version => {
                revFormObj.version = version
            })
        // })
        // .then(() => {

        let revisionArrProms = revisionArr.map(revisionObj => {
            revisionObj.versionId = revFormObj.version.id
            return API.postRevision(revisionObj)
            // .then(revision => {
            //     postedRevisions.push(revision)
            // })
        })
        Promise.all(revisionArrProms).then(() => console.log('Revisions posted', revisionArrProms))

        let postedRevisions = await API.getRevisions(revFormObj.version.id)
        revFormObj.revisions = postedRevisions
        // })

        this.setState({ revisionFormObj: revFormObj })
        // .then(() => this.props.history.push('/songList'))
        this.getAllData()
        this.props.history.push('/songList')
    }

    componentDidMount() {
        // console.log('CDM', this.state.user)
        // const data = {}
        // let newState = {}
        this.getAllData()

        // API.getAllArtists().then(allArtists => {
        //     data.artists = allArtists
        // })
        //     .then(() => API.getAllSongs().then(allSongs => {
        //         data.songs = allSongs
        //     }))
        //     .then(() => API.getAllVersions().then(allVersions => {
        //         data.versions = allVersions
        //     }))
        //     .then(() => API.getAllRevisions().then(allRevisions => {
        //         data.revisions = allRevisions
        //     }))
        //     .then(() => this.createMasterObjects(data))
        //     .then((masterVersions) => newState.versions = masterVersions)
        //     .then(() => this.setState(newState)
        //     )
    }


    render() {
        console.log(this.state.user)
        return (
            <div className="container app-view-container">
                <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />

                <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />

                {/* <Route exact path="/" render={(props) => {
                    return this.state.user ? (
                        <Home {...props} user={this.state.user} onLogout={logout} />
                    ) : (
                            <Redirect to="/login" />
                        )
                }} /> */}

                <Route exact path="/songList" render={props => {
                    return this.state.user ? (
                        <SongList
                            versions={this.state.versions}
                            deleteSong={this.deleteSong}
                        />
                    ) : (
                            <Redirect to="/login" />
                        )
                }} />
                <Route exact path="/songList/:versionId(\d+)" render={(props) => {
                    // if (this.isAuthenticated()) { <-- not necessary
                    if (this.state.user) {
                        // Find the version with the id of the route parameter
                        let version = this.state.versions.find(version =>
                            version.id === parseInt(props.match.params.versionId))

                        // If the version wasn't found, create a default one
                        if (!version) {
                            version = { id: 404, versionNum: "Version not found" }
                        }

                        return <VersionDetail version={version} deleteVersion={this.deleteVersion} getAllData={this.getAllData} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/revisionForm" render={props => {
                    return this.state.user ? (
                        <RevisionForm
                            user={this.state.user}
                            saveRevisionForm={this.saveRevisionForm}
                            {...props}
                        />
                    ) : (
                            <Redirect to="/login" />
                        )
                }} />
            </div>
        )
    }
}

export default withRouter(ApplicationViews)