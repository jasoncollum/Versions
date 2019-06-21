import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default class VersionCard extends Component {

    version = this.props.versions.find(version =>
        version.artist.id === this.props.song.artistId
    )

    artist = this.version.artist

    // Pass in song.id to deleteSong
    handleClick = () => {
        // const versionsToDelete =
        this.props.deleteSong(this.version.song.id)
    }

    render() {
        return (
            <div className="songListItem">
                <Card style={{ backgroundColor: '#F3F3F3' }}>
                    <CardImg top width="100%" src={this.version.artist.imageURL} alt="Card image cap" />
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
                        <Button onClick={this.handleClick} outline color="secondary" style={{ float: 'right', fontSize: '.7em' }} >Delete Song</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
