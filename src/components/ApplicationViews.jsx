import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
import RevisionForm from './revision/RevisionForm'
import SongList from './list/SongList'
import VersionDetail from './list/VersionDetail'
import API from '../modules/API'

class ApplicationViews extends Component {

    state = {
        versions: [],
        revisionFormObj: {}
    }

    deleteRevision = (revisionId) => {
        API.deleteRevision(revisionId)
    }

    deleteVersion = async (version_Id) => {
        const versionToDelete = await this.state.versions.find(version => version.id === version_Id)
        await versionToDelete.revisions.forEach(revision => API.deleteRevision(revision.id))
        await API.deleteVersion(versionToDelete.id)
        await this.getAllData()
    }

    deleteSong = async (song_Id) => {
        const revisionsToDelete = []
        const versionsToDelete = await this.state.versions.filter(version => version.songId === song_Id)
        await versionsToDelete.forEach(version => {
            version.revisions.forEach(revision => {
                revisionsToDelete.push(revision)
            })
        })

        await revisionsToDelete.forEach(revision => API.deleteRevision(revision.id))
        await versionsToDelete.forEach(version => API.deleteVersion(version.id))
        await API.deleteSong(song_Id)
        await this.getAllData()
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
            .then((masterVersions) => newState.versions = masterVersions)
            .then(() => this.setState(newState)
            )
            .then(() => this.props.history.push('/songList'))
    }

    saveRevisionForm = (artistObj, songObj, versionObj, revisionArr) => {
        console.log('revisions array', revisionArr)
        const revFormObj = {}

        API.postArtist(artistObj)
            .then(artist => {
                revFormObj.artist = artist
            })
            .then(() => {
                songObj.artistId = revFormObj.artist.id
                return API.postSong(songObj)
                    .then(song => {
                        revFormObj.song = song
                    })
            })
            .then(() => {
                versionObj.songId = revFormObj.song.id
                return API.postVersion(versionObj)
                    .then(version => {
                        revFormObj.version = version
                    })
            })
            .then(() => {
                let postedRevisions = []
                revisionArr.forEach(revisionObj => {
                    revisionObj.versionId = revFormObj.version.id
                    API.postRevision(revisionObj)
                        .then(revision => {
                            postedRevisions.push(revision)
                        })
                })
                revFormObj.revisions = postedRevisions
            })
            .then(() => this.setState({ revisionFormObj: revFormObj }))
            .then(() => this.props.history.push('/songList'))
            .then(() => this.getAllData())
    }

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
            .then(() => API.getAllRevisions().then(allRevisions => {
                data.revisions = allRevisions
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
                        deleteSong={this.deleteSong}
                    />
                }} />
                <Route exact path="/songList/:versionId(\d+)" render={(props) => {
                    // if (this.isAuthenticated()) {
                    // Find the version with the id of the route parameter
                    let version = this.state.versions.find(version =>
                        version.id === parseInt(props.match.params.versionId))

                    // If the version wasn't found, create a default one
                    if (!version) {
                        version = { id: 404, versionNum: "Version not found" }
                    }

                    return <VersionDetail version={version} deleteVersion={this.deleteVersion} getAllData={this.getAllData} />
                    // } else {
                    //     return <Redirect to="/login" />
                    // }
                }} />

                <Route exact path="/revisionForm" render={props => {
                    return <RevisionForm
                        saveRevisionForm={this.saveRevisionForm}
                        {...props}
                    />
                }} />
            </div>
        )
    }
}

export default withRouter(ApplicationViews)