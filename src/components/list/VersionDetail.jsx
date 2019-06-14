import React, { Component } from 'react'

export default class VersionDetail extends Component {
    // artist = this.props.version.artist
    // song = this.props.version.song
    // requests = this.props.version.requests

    render() {
        console.log(this.requests)
        return (
            <section className="versionDetail">
                <div className="card-body">
                    <h4 className="card-title">{this.song.title}</h4>
                    <h5 className="card-title">Version {this.props.version.versionNum}</h5>
                    <hr></hr>
                    <div>
                        {
                            this.requests.map(request =>
                                <p key={request.id}>{request.requestText}</p>
                            )
                        }
                    </div>
                </div>
            </section>
        )
    }
}
