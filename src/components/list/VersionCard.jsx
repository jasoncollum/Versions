import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class VersionCard extends Component {

    version = this.props.versions.find(version =>
        version.artist.id === this.props.song.artistId
    )

    artistName = this.version.artist.name

    render() {
        console.log(this.artistName)
        return (
            <section className="songListItem">
                <h4>{this.props.song.title}</h4>
                <p>{this.artistName}</p>
                {
                    this.props.versions.map(version =>
                        (version.songId === this.props.song.id) ?
                            <h5 key={version.id}><Link className="nav-link" to={`/songList/${version.id}`}
                            >Version {version.versionNum}</Link></h5>
                            : ""
                    )
                }
            </section>
        )
    }
}
