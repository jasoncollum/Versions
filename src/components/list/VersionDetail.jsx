import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FiTrash2, FiPlus } from 'react-icons/fi'

import 'bootstrap/dist/css/bootstrap.css';
import API from '../../modules/API';

export default class VersionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            songTitleInput: '',
            versionNumberInput: '',
            artistNameInput: '',
            revisions: [{ text: '' }],
            newRevisionInputText: []
        };

        this.toggle = this.toggle.bind(this);
        this.handlesavechangesbtn = this.handlesavechangesbtn.bind(this)
        this.handlecancelbtn = this.handlecancelbtn.bind(this)
    }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }))
    }

    handlesavechangesbtn = async (e) => {
        e.preventDefault()

        // HANDLE NEW REVISIONS
        await this.pushNewRevisions()
        // post new revisions to db
        const newRevisionArr = await this.state.newRevisionInputText.map(newRevisionText => {
            return {
                revisionText: newRevisionText,
                versionId: this.props.version.id
            }
        })
        await console.log(newRevisionArr)
        // await newRevisionArr.map(revision => API.postRevision(revision))
        // ... end of New Revisions


    }

    handlecancelbtn() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            revisions: [{ text: '' }]
        }))
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

    // push all new revision text to newRevisionInputText array in state
    pushNewRevisions = () => {
        const newRevisionInputs = document.querySelectorAll('#newRevisionGroup input')
        newRevisionInputs.forEach(input => {
            let floatState = this.state.newRevisionInputText
            floatState.push(input.value)
            this.setState({ newRevisionInputText: floatState })
        })
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
                        <Modal isOpen={this.state.modal}
                            className={this.props.className}
                            centered={true}>
                            <ModalHeader toggle={this.toggle}>Add | Edit Revisions</ModalHeader>
                            <ModalBody>
                                <Form id="revisionForm">
                                    {/* <Row form>
                                        <Col md={6}> */}
                                    <FormGroup>
                                        <Label for="songTitleInput">{this.props.version.song.title}</Label>
                                        {/* <Input type="text" name="songTitleInput" id="songTitleInput"
                                                    placeholder="Song Title"
                                                    onChange={this.handleFieldChange} /> */}
                                    </FormGroup>
                                    {/* </Col>
                                        <Col md={2}> */}
                                    <FormGroup>
                                        <Label for="versionNumberInput">Version {this.props.version.versionNum}</Label>
                                        {/* <Input type="text" name="versionNumberInput" id="versionNumberInput"
                                                    placeholder="Version No."
                                                    onChange={this.handleFieldChange} /> */}
                                    </FormGroup>
                                    {/* </Col>
                                    </Row> */}
                                    {/* <Row form>
                                        <Col md={12}> */}
                                    <FormGroup id="revisionGroup">
                                        {/* <p>Mix Revisions</p> */}
                                        {
                                            this.props.version.revisions.map(revision => (
                                                <InputGroup key={revision.id}>
                                                    <Input key={revision.id}
                                                        id={revision.id}
                                                        type="text"
                                                        placeholder="Enter a mix revision"
                                                        value={revision.revisionText}
                                                        onChange={this.handleFieldChange}
                                                        style={{ marginBottom: '5px' }}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn" color="outline-secondary"><FiTrash2 />
                                                        </span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            ))
                                        }
                                        {
                                            revisions.map((val, idx) => {
                                                let revisionId = `revision-${idx}`
                                                return (
                                                    <div key={idx} id="newRevisionGroup">
                                                        {/* <Label for={revisionId} hidden>Mix Revisions</Label> */}
                                                        <InputGroup>
                                                            <Input
                                                                type="text"
                                                                name={revisionId}
                                                                data-id={idx}
                                                                id={revisionId}
                                                                placeholder="Add a mix revision ..."
                                                                onChange={this.handleFieldChange}
                                                                style={{ marginBottom: '5px' }} />
                                                            <InputGroupAddon addonType="append">
                                                                <span className="btn" color="outline-secondary"
                                                                    onClick={this.addRevision} id="revisionBtn"><FiPlus />
                                                                </span>
                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <Button onClick={this.addRevision} id="revisionBtn">+</Button> */}
                                    </FormGroup>
                                    {/* </Col>
                                    </Row> */}
                                    {/* <Button onClick={this.handleSubmit}>Submit</Button> */}
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handlesavechangesbtn}>Save Changes</Button>{' '}
                                <Button color="secondary" onClick={this.handlecancelbtn}>Cancel</Button>
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