import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class VersionCard extends Component {

    render() {
        const artist = this.props.artists.find(artist => artist.id === this.props.song.artistId)
        const versions = this.props.versions.filter(version => version.songId === this.props.song.id)

        return (
            <section className="songListItem">
                <h4>{this.props.song.title}</h4>
                <p>{artist.name}</p>
                {
                    versions.map(version =>
                        <h5 key={version.id}><Link className="nav-link" to={`/songList/${version.id}`}
                        >Version {version.versionNum}</Link></h5>
                    )
                }
            </section>
        )
    }
}
