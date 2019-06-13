import React, { Component } from 'react'
import VersionCard from './VersionCard'
// import { Link } from 'react-router-dom'
import './songList.css'

export default class SongList extends Component {
    songs = this.props.versions.map(version => {
        return version.song
    })


    uniqueSongs = Array.from(new Set(this.songs))


    render() {
        console.log(this.uniqueSongs)
        return (
            <React.Fragment>
                <section className="songList">
                    {
                        this.uniqueSongs.map(song =>
                            <VersionCard key={song.id}
                                song={song}
                                versions={this.props.versions}
                                {...this.props} />
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}
