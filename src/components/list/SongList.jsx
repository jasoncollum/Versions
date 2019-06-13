import React, { Component } from 'react'
import VersionCard from './VersionCard'
// import { Link } from 'react-router-dom'
import './songList.css'

export default class SongList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <section className="songList">
                    {
                        this.props.versions.map(version =>
                            <VersionCard key={version.id}
                                // song={song}
                                // artists={this.props.artists}
                                // versions={this.props.versions}
                                // requests={this.props.requests}
                                version={version}
                                {...this.props} />
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}
