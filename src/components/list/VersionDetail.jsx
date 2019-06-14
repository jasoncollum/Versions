import React, { Component } from 'react'

export default class VersionDetail extends Component {
    state = {
        version: {}
    }

    componentDidMount() {
        this.setState({ version: this.props.version })
    }

    render() {
        if (this.props.version.song) {
            return (
                <section className="versionDetail">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.version.song.title}</h4>
                        <h5 className="card-title">Version {this.props.version.versionNum}</h5>
                        <hr></hr>
                        <div>
                            {
                                this.props.version.requests.map(request =>
                                    <p key={request.id}>{request.requestText}</p>
                                )
                            }
                        </div>
                    </div>
                </section>
            )
        } else {
            return null
        }
    }
}
