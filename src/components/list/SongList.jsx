import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class SongList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h4>{this.props.song.title} MIX V{this.props.version.versionNum}</h4>
                {
                    this.props.requests.map(request => {
                        return <p>{request.requestText}</p>
                    })
                }
            </div>
        )
    }
}
