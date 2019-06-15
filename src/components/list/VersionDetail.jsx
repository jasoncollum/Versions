import React, { Component } from 'react'
// import EditFormModal from '../Modal/EditFormModal'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css';

export default class VersionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log('toggled')
        this.setState(prevState => ({ modal: !prevState.modal }))
    }

    handleDeleteBtn = () => {
        console.log('delete version')
        this.props.deleteVersion(this.props.version.id)
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
                                this.props.version.revisions.map(revision =>
                                    <p key={revision.id}>{revision.revisionText}</p>
                                )
                            }
                        </div>
                        <Button onClick={this.toggle}>Edit Version</Button>
                        <button onClick={this.handleDeleteBtn} className="">X</button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Save Changes</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </section>
            )
        } else {
            return null
        }
    }
}