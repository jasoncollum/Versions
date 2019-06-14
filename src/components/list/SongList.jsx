import React, { Component } from 'react'
import VersionCard from './VersionCard'
// import { Link } from 'react-router-dom'
import './songList.css'

export default class SongList extends Component {

    render() {
        const songs = this.props.versions.map(version => {
            return version.song
        })

        const uniqueSongsArray = Array.from(new Set(songs))
        console.log()
        if (this.props.versions) {
            return (
                <React.Fragment>
                    <section className="songList">
                        {
                            uniqueSongsArray.map(song =>
                                <VersionCard key={song.id}
                                    song={song}
                                    versions={this.props.versions}
                                    deleteSong={this.props.deleteSong}
                                    {...this.props} />
                            )
                        }
                    </section>
                </React.Fragment>
            )
        } else {
            return null
        }
    }
}
