import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import Login from './Login';
import Register from './Register';
import { getUserFromLocalStorage } from '../auth/userManager';
import SongSetupForm from './forms/SongSetupForm'
import RevisionForm from './forms/RevisionForm'
import SongList from './list/SongList'
import VersionDetail from './list/VersionDetail'
import API from '../modules/API'


class ApplicationViews extends Component {

    state = {
        user: getUserFromLocalStorage(),
        versions: [],
        revisionFormObj: {}
    }

    deleteRevision = async (revisionId) => {
        await API.deleteRevision(revisionId)
    }

    deleteVersion = async (version_Id) => {
        const versionToDelete = this.state.versions.find(version => version.id === version_Id)

        await API.deleteVersion(versionToDelete.id)
        await this.getAllData()
    }

    deleteSong = async (song_Id) => {
        await API.deleteSong(song_Id)
        await this.getAllData()
    }

    // Assemble data in version objects
    createMasterObjects = (data) => {
        data.versions.forEach(version => {
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

        data.artists = await API.getAllArtists()
        data.songs = await API.getAllSongs()
        data.versions = await API.getAllVersions()
        data.revisions = await API.getAllRevisions()

        const masterVersions = this.createMasterObjects(data)

        const userVersions = masterVersions.filter(version => version.song.userId === this.state.user.id)

        newState.versions = userVersions

        this.setState(newState)
        this.props.history.push('/songList')
    }

    componentDidMount() {
        if (this.state.user) {
            this.getAllData()
        } else {
            this.props.history.push('/login')
        }
    }


    render() {
        return (
            <div className="container app-view-container">
                <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} getAllData={this.getAllData} />} />

                <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />

                <Route exact path="/songList" render={props => {
                    return this.state.user ? (
                        <SongList
                            versions={this.state.versions}
                            deleteSong={this.deleteSong}
                            getAllData={this.getAllData}
                        />
                    ) : (
                            <Redirect to="/login" />
                        )
                }} />
                <Route exact path="/songList/:versionId(\d+)" render={(props) => {
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