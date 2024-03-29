import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardBody, Button
} from 'reactstrap';
import API from '../../modules/API'
import './versionCard.css'

export default class VersionCard extends Component {
    // Find Artist
    artist = this.props.versions.find(version =>
        version.artist.id === this.props.song.artistId
    ).artist

    // New Version
    handleNewVersion = async (song, artist) => {
        // Determine how many versions currently exist
        const versionArr = this.props.versions.filter(version => {
            return version.songId === song.id
        })
        // Create new version object
        let newVersionObj = {
            versionNum: parseInt(versionArr.length + 1, 10),
            songId: song.id
        }
        // Post new version
        await API.postVersion(newVersionObj)
        this.props.getAllData()
    }

    // Delete song, versions, and revisions
    handleDelete = async () => {
        this.props.deleteSong(this.props.song.id)
    }

    render() {
        return (
            <div className="songListItem">
                <Card style={{ backgroundColor: '#F3F3F3' }}>
                    <CardImg top width="100%" src={this.artist.imageURL} alt="Card image cap" />
                    <CardBody>
                        <h4>{this.props.song.title}</h4>
                        <p>{this.artist.name}</p>
                        {
                            this.props.versions.map(version =>
                                (version.songId === this.props.song.id) ?
                                    <h5 key={version.id}><Link className="nav-link" to={`/songList/${version.id}`}
                                    >Version {version.versionNum}</Link></h5>
                                    : ""
                            )
                        }
                        <Button onClick={() => this.handleNewVersion(this.props.song, this.artist)} outline color="primary" style={{ float: 'left', fontSize: '.7em' }} className="newVersionBtn">New Version</Button>
                        <Button onClick={this.handleDelete} outline color="secondary" style={{ float: 'right', fontSize: '.7em' }} >Delete Song</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
