import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import Login from './Login';
import Register from './Register';
// import Home from './Home';
import { getUserFromLocalStorage, logout } from '../auth/userManager';
import SongSetupForm from './revision/SongSetupForm'
import RevisionForm from './revision/RevisionForm'
import SongList from './list/SongList'
import VersionDetail from './list/VersionDetail'
import API from '../modules/API'
// import { promised } from 'q';

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

        await API.deleteVersion(versionToDelete.id)
        this.getAllData()
    }

    deleteSong = async (song_Id) => {
        // console.log('deleteSong called')
        const versionsToDelete = this.state.versions.filter(version => version.songId === song_Id)

        await versionsToDelete.map(version => {
            return API.deleteVersion(version.id)
        })

        await API.deleteSong(song_Id)
            .then(() => this.getAllData())
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

    getAllData = async () => {
        const data = {}
        let newState = {}

        await API.getAllArtists().then(allArtists => {
            data.artists = allArtists
        })
        await API.getAllSongs().then(allSongs => {
            data.songs = allSongs
        })
        await API.getAllVersions().then(allVersions => {
            data.versions = allVersions
        })
        await API.getAllRevisions().then(allRevisions => {
            data.revisions = allRevisions
        })
        const masterVersions = this.createMasterObjects(data)

        const userVersions = masterVersions.filter(version => version.song.userId === this.state.user.id)
        console.log('USER VERSIONS', userVersions)
        newState.versions = userVersions

        this.setState(newState)
        this.props.history.push('/songList')
    }

    // saveSongSetupForm = async (artistObj, songObj, versionObj) => {
    //     // console.log('revisions array', revisionArr)
    //     const revFormObj = {}

    //     await API.postArtist(artistObj)
    //         .then(artist => {
    //             revFormObj.artist = artist
    //         })

    //     songObj.artistId = revFormObj.artist.id
    //     await API.postSong(songObj)
    //         .then(song => {
    //             revFormObj.song = song
    //         })

    //     versionObj.songId = revFormObj.song.id
    //     await API.postVersion(versionObj)
    //         .then(version => {
    //             revFormObj.version = version
    //         })

    //     this.getAllData()
    // }

    saveRevisionForm = async (artistObj, songObj, versionObj, revisionArr) => {
        // console.log('revisions array', revisionArr)
        const revFormObj = {}

        await API.postArtist(artistObj)
            .then(artist => {
                revFormObj.artist = artist
            })

        songObj.artistId = revFormObj.artist.id
        await API.postSong(songObj)
            .then(song => {
                revFormObj.song = song
            })

        versionObj.songId = revFormObj.song.id
        await API.postVersion(versionObj)
            .then(version => {
                revFormObj.version = version
            })

        let revisionArrProms = revisionArr.map(revisionObj => {
            revisionObj.versionId = revFormObj.version.id
            let dbCall = API.postRevision(revisionObj)
            return dbCall

        })
        Promise.all(revisionArrProms).then(() => console.log('Revisions posted', revisionArrProms))
            .then(() => this.getAllData())
    }

    componentDidMount() {
        this.getAllData()
        // this.props.history.push('/songList')
    }


    render() {
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

                <Route exact path="/songSetupForm" render={props => {
                    return this.state.user ? (
                        <SongSetupForm
                            user={this.state.user}
                            getAllData={this.getAllData}
                            {...props}
                        />
                    ) : (
                            <Redirect to="/login" />
                        )
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