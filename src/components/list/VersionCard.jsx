import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default class VersionCard extends Component {
    // version = this.props.versions.find(version =>
    //     version.artist.id === this.props.song.artistId
    // )

    // Find Artist
    artist = this.props.versions.find(version =>
        version.artist.id === this.props.song.artistId
    ).artist

    //  New Version
    handleNewVersion = () => {
        console.log('New Version Button')
    }

    // Pass in song.id to deleteSong
    handleDelete = () => {
        // const versionsToDelete =
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
                        <Button onClick={this.handleNewVersion} outline color="primary" style={{ float: 'left', fontSize: '.7em' }} >New Version</Button>
                        <Button onClick={this.handleDelete} outline color="secondary" style={{ float: 'right', fontSize: '.7em' }} >Delete Song</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
