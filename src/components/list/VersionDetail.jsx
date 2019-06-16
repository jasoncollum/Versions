import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Col, Row, Form, FormGroup, Label, Input, } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css';

export default class VersionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            songTitleInput: '',
            versionNumberInput: '',
            artistNameInput: '',
            revisions: [{ text: '' }],
            revisionInputText: []
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

    //EDIT FORM LOGIC ...
    addRevision = (e) => {
        this.setState((prevState) => ({
            revisions: [...prevState.revisions, { text: '' }]
        }));
    }

    // push all revision text to revisionInputText array in state
    pushRevisions = () => {
        const revisionInputs = document.querySelectorAll('#revisionGroup textarea')
        revisionInputs.forEach(input => {
            let floatState = this.state.revisionInputText
            floatState.push(input.value)
            console.log('pushRevisions', floatState)
            this.setState({ revisionInputText: floatState })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.pushRevisions()

        // post to db
        const artistObj = this.createArtistObj()
        const songObj = this.createSongObj()
        const versionObj = this.createVersionObj()
        const revisionArr = this.state.revisionInputText.map(revision => {
            return { revisionText: revision }
        })

        this.props.saveRevisionForm(artistObj, songObj, versionObj, revisionArr)
    }

    handleFieldChange = e => {
        if (['text'].includes(e.target.className)) {
            let revisions = [...this.state.revisions]
            revisions[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ revisions }, () => console.log('revisions', this.state.revisions))
        }
        if (e.target.type !== 'textarea') {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    // Create objects:  artist, song, version, request
    createArtistObj = () => {
        return {
            name: this.state.artistNameInput
        }
    }

    createSongObj = () => {
        return {
            title: this.state.songTitleInput
        }
    }

    createVersionObj = () => {
        return {
            versionNum: parseInt(this.state.versionNumberInput)
        }
    }

    createRevisionObjArr = (strArr) => {
        return {
            revisionText: this.state.revisionInputText
        }
    }
    // ... end Edit Form Logic

    render() {
        if (this.props.version.song) {
            let { revisions } = this.state
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
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true}>
                            <ModalHeader toggle={this.toggle}>Add | Edit Revisions</ModalHeader>
                            <ModalBody>
                                <Form id="revisionForm">
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="songTitleInput">{this.props.version.song.title}</Label>
                                                {/* <Input type="text" name="songTitleInput" id="songTitleInput"
                                                    placeholder="Song Title"
                                                    onChange={this.handleFieldChange} /> */}
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="versionNumberInput">Version {this.props.version.versionNum}</Label>
                                                {/* <Input type="text" name="versionNumberInput" id="versionNumberInput"
                                                    placeholder="Version No."
                                                    onChange={this.handleFieldChange} /> */}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup id="revisionGroup">
                                                {/* <p>Mix Revisions</p> */}
                                                {
                                                    this.props.version.revisions.map(revision => (
                                                        <Input key={revision.id}
                                                            id={revision.id}
                                                            type="text"
                                                            placeholder="Enter a mix revision"
                                                            value={revision.revisionText}
                                                            onChange={this.handleFieldChange}
                                                            style={{ marginBottom: '5px' }}
                                                        />

                                                    ))
                                                }
                                                {
                                                    revisions.map((val, idx) => {
                                                        let revisionId = `revision-${idx}`
                                                        return (
                                                            <div key={idx}>
                                                                {/* <Label for={revisionId} hidden>Mix Revisions</Label> */}
                                                                <Input
                                                                    type="text"
                                                                    name={revisionId}
                                                                    data-id={idx}
                                                                    id={revisionId}
                                                                    placeholder="Add a mix revision ..."
                                                                    onChange={this.handleFieldChange}
                                                                    style={{ marginBottom: '5px' }} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <Button onClick={this.addRevision} id="revisionBtn">+</Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button onClick={this.handleSubmit}>Submit</Button>
                                </Form>
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