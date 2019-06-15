import React, { Component } from 'react'


export default class VersionDetail extends Component {

    handleEditBtn = () => {
        console.log('edit version')
    }

    handleDeleteBtn = () => {
        console.log('delete version')
        this.props.deleteVersion(this.props.version.id)
    }

    render() {
        if (this.props.version.song) {
            console.log(this.props.version)
            return (
                <section className="versionDetail">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.version.song.title}</h4>
                        <h5 className="card-title">Version {this.props.version.versionNum}</h5>
                        <hr></hr>
                        <div>
                            {
                                this.props.version.revisions.map(revision =>
                                    <p key={revision.id}>{revision.revisionText}</p>
                                )
                            }
                        </div>
                        <button onClick={this.handleEditBtn} className="">Edit Version</button>
                        <button onClick={this.handleDeleteBtn} className="">X</button>
                    </div>
                </section>
            )
        } else {
            return null
        }
    }
}
