import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class SongList extends Component {

    componentDidMount() {
        console.log(this.props.song.versions)
    }

    render() {
        return (
            <div>
                {
                    this.props.versions.map(version =>
                        <h4 key={version.id}>{this.props.song.title} MIX V{version.versionNum}</h4>
                    )
                }
            </div>
        )
    }
}
