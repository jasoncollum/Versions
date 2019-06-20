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
                    <CardImg top width="100%" src="http://media2.s-nbcnews.com/j/MSNBC/Components/Photo/_new/101202-great-white-shark-hmed-755a.grid-6x2.jpg" alt="Card image cap" />
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
                        <button onClick={this.handleClick}>X</button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
