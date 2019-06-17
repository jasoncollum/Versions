import React, { Component } from 'react'
import API from '../../modules/API';
import RevisionComp from './RevisionComp'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FiMinus, FiPlus } from 'react-icons/fi'

import 'bootstrap/dist/css/bootstrap.css';
import './versionDetail.css'


export default class VersionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            // songTitleInput: '',
            // versionNumberInput: '',
            // artistNameInput: '',
            revisions: [{ text: '' }],
            updatedRevisionIds: [],
            newRevisionInputText: []
        };

        this.toggle = this.toggle.bind(this);
        this.handlesavechangesbtn = this.handlesavechangesbtn.bind(this)
        this.handlecancelbtn = this.handlecancelbtn.bind(this)
    }

    // hideRevision() {
    //     this.setState({ hide: true })
    // }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }))
    }

    handlesavechangesbtn = async (e) => {
        e.preventDefault()
        // HANDLE UPDTATED REVISIONS
        const updatedRevisionArray = await this.createUpdatedRevisionObjects()
        await updatedRevisionArray.forEach(updatedRevisionObj => API.updateRevision(updatedRevisionObj.id, updatedRevisionObj))
        //  ... end of Updated Revisions

        // HANDLE NEW REVISIONS
        await this.pushNewRevisions()
        // post new revisions to db
        const newRevisionArr = await this.state.newRevisionInputText.map(newRevisionText => {
            return {
                revisionText: newRevisionText,
                versionId: this.props.version.id
            }
        })
        // await console.log(newRevisionArr)
        await newRevisionArr.map(newRevisionObj => API.postRevision(newRevisionObj))
        // ... end of New Revisions

        this.props.getAllData()

        // toggle modal state and reset rvisions state
        // this.setState(prevState => ({
        //     modal: !prevState.modal,
        //     revisions: [{ text: '' }]
        // }))
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

    handleMinus = (revisionId) => {
        console.log('minus icon', revisionId)
        this.setState({ hide: true })
        // const revisionToDelete = document.getElementById('revisionId')

    }

    //EDIT FORM LOGIC ...
    addRevision = (e) => {
        this.setState((prevState) => ({
            revisions: [...prevState.revisions, { text: '' }]
        }));
    }

    createUpdatedRevisionObjects() {
        if (this.state.updatedRevisionIds.length > 0) {
            const updatedRevisionArray = this.state.updatedRevisionIds.map(revId => {
                const targetInput = document.getElementById(`${revId}`)
                return {
                    id: (targetInput.id),
                    revisionText: targetInput.value,
                    versionId: this.props.version.id
                }
            })
            return updatedRevisionArray
        }
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
        // check if updating an existing revision
        if (e.target.type === 'text' && typeof parseInt(e.target.id) === 'number') {
            if (!this.state.updatedRevisionIds.includes(e.target.id)) {
                this.state.updatedRevisionIds.push(e.target.id)
            }

            console.log('VALUE', e.target.value)
        }
    }

    // Create objects:  artist, song, version, request
    // createArtistObj = () => {
    //     return {
    //         name: this.state.artistNameInput
    //     }
    // }

    // createSongObj = () => {
    //     return {
    //         title: this.state.songTitleInput
    //     }
    // }

    // createVersionObj = () => {
    //     return {
    //         versionNum: parseInt(this.state.versionNumberInput)
    //     }
    // }

    // createRevisionObjArr = (strArr) => {
    //     return {
    //         revisionText: this.state.revisionInputText
    //     }
    // }
    // ... end Edit Form Logic

    // set existing properties in state
    // componentDidMount() {

    //     this.props.version.revisions.map(revision => {
    //         this.setState({ [revision.id]: revision.revisionText })
    //     })

    //     console.log('mount', this.state)
    // }

    render() {
        if (this.props.version.song) {
            console.log('render', this.state)
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
                        <Button onClick={this.toggle} outline color="secondary">Add | Edit Revisions</Button>
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
                                                <RevisionComp key={revision.id}
                                                    revision={revision}
                                                    handleFieldChange={this.handleFieldChange}
                                                    handleMinus={this.handleMinus}
                                                />
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
                                                                <FiPlus onClick={this.addRevision} id="revisionBtn"
                                                                    style={{ margin: 'auto' }} />
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