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
            removeRevisionIds: [],
            newRevisionInputText: []
        };

        this.toggle = this.toggle.bind(this);
        this.handlesavechangesbtn = this.handlesavechangesbtn.bind(this)
        // this.handlecancelbtn = this.handlecancelbtn.bind(this)
    }

    // hideRevision() {
    //     this.setState({ hide: true })
    // }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }))
    }

    handlesavechangesbtn = async (e) => {
        e.preventDefault()
        console.log('updated revisions ids', this.state.updatedRevisionIds)
        // HANDLE UPDTATED REVISIONS
        const updatedRevisionArray = this.createUpdatedRevisionObjects()
        if (updatedRevisionArray) {
            await updatedRevisionArray.map(updatedRevisionObj => API.updateRevision(updatedRevisionObj.id, updatedRevisionObj))
        }
        //  ... end of Updated Revisions

        // HANDLE DELETE REVISIONS
        if (this.state.removeRevisionIds.length > 0) {
            await this.state.removeRevisionIds.map(id => API.deleteRevision(id))
        }
        //  ... end of HANDLE REMOVE REVISIONS

        // HANDLE NEW REVISIONS
        this.pushNewRevisions()
        // post new revisions to db
        const newRevisionArr = this.state.newRevisionInputText.map(newRevisionText => {
            return {
                revisionText: newRevisionText,
                versionId: this.props.version.id
            }
        })

        // await console.log(newRevisionArr)
        await newRevisionArr.map(newRevisionObj => API.postRevision(newRevisionObj))
        // ... end of New Revisions

        await this.props.getAllData()
        this.setState({
            revisions: [{ text: '' }],
            updatedRevisionIds: [],
            removeRevisionIds: [],
            newRevisionInputText: []
        })
        this.toggle()
        this.props.history.push(`/songList/${this.props.version.id}`)

    }

    // handlecancelbtn() {
    //     this.setState(prevState => ({
    //         modal: !prevState.modal,
    //         revisions: [{ text: '' }]
    //     }))
    // }
    newRevisionsArray = []

    handleDeleteBtn = () => {
        console.log('delete version')
        this.props.deleteVersion(this.props.version.id)
    }

    handleMinus = (revisionId) => {
        console.log('minus icon', revisionId)
        // if (!this.state.removeRevisionIds.includes(revisionId)) {
        //     this.state.removeRevisionIds.push(revisionId)
        // }
        API.deleteRevision(revisionId).then(() => console.log('revision deleted:'))
    }

    handleBlur = (e) => {
        console.log('Blur', e.target.id, e.target.value)
        // Check if previously existing revision
        if (e.target.type === 'text' && !e.target.id.includes('-')) {
            const updatedRevision = { revisionText: e.target.value }
            API.updateRevision(e.target.id, updatedRevision)
        }
        // Check if new revision
        if (e.target.type === 'text' && e.target.id.includes('-')) {
            if (!this.state[e.target.id]) {
                console.log('UNDEFINED')
                const newRevisionObject = {
                    revisionText: e.target.value,
                    versionId: this.props.version.id
                }
                API.postRevision(newRevisionObject).then((result) => {

                })
            } // Check if revision-idx
            if (typeof this.state[e.target.id] === Object) {
                const updatedRevisionObject = {
                    revisionText: e.target.value
                }
            }
        }
    }

    //EDIT FORM LOGIC ...
    addRevision = (e) => {
        // add new Revision INPUT
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
        } else {
            return
        }
    }

    // push all new revision text to newRevisionInputText array in state
    pushNewRevisions = () => {
        const newRevisionInputs = document.querySelectorAll('.newRevisionGroup input')
        newRevisionInputs.forEach(input => {
            let floatState = this.state.newRevisionInputText
            if (input.value !== '') {
                floatState.push(input.value)
                this.setState({ newRevisionInputText: floatState })
            }
        })
    }



    handleFieldChange = e => {
        if (['text'].includes(e.target.className)) {
            let revisions = [...this.state.revisions]
            revisions[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ revisions }, () => console.log('revisions', this.state.revisions))
        }
        // else {
        //     this.setState({ [e.target.name]: e.target.value })
        // }
        // check if updating an existing revision
        if (e.target.type === 'text' && !e.target.id.includes('-')) {
            if (!this.state.updatedRevisionIds.includes(e.target.id)) {
                this.state.updatedRevisionIds.push(e.target.id)
            }

            console.log('VALUE', e.target.value)
        }
    }

    componentDidMount() {
        console.log('VersionDetail mounted')
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
            console.log('version', this.props.version)
            let { revisions } = this.state
            return (
                <section className="versionDetail" style={{ width: '500px' }}>
                    <div className="card-body">
                        <div className="song-info">
                            <div className="title-version">
                                <h4 className="card-title">{this.props.version.song.title}</h4>
                                <h5 className="card-title">Version {this.props.version.versionNum}</h5>
                            </div>
                            <div className="artist-image">
                                <img src={this.props.version.artist.imageURL} alt="artist" />
                            </div>
                        </div>
                        <hr></hr>
                        <div>
                            {
                                this.props.version.revisions.map(revision =>
                                    <p key={revision.id}>{revision.revisionText}</p>
                                )
                            }
                        </div>
                        <hr></hr>
                        <Button onClick={this.handleDeleteBtn} outline color="danger"
                            style={{ float: 'right', margin: '0 10px', fontSize: '.7em' }}>Delete Version</Button>
                        <Button onClick={this.toggle} outline color="primary"
                            style={{ float: 'right', fontSize: '.7em' }}>Add | Edit Revisions</Button>
                        <Modal isOpen={this.state.modal}
                            className={this.props.className}
                            centered={true}
                            style={{ maxWidth: '575px' }}>
                            <ModalHeader toggle={this.toggle}>Add | Edit Revisions</ModalHeader>
                            <ModalBody>
                                <Form id="revisionForm">
                                    <FormGroup>
                                        <Label for="songTitleInput">{this.props.version.song.title}</Label>
                                        {/* <Input type="text" name="songTitleInput" id="songTitleInput"
                                                    placeholder="Song Title"
                                                    onChange={this.handleFieldChange} /> */}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="versionNumberInput">Version {this.props.version.versionNum}</Label>
                                        {/* <Input type="text" name="versionNumberInput" id="versionNumberInput"
                                                    placeholder="Version No."
                                                    onChange={this.handleFieldChange} /> */}
                                    </FormGroup>
                                    <FormGroup id="revisionGroup">
                                        {/* <p>Mix Revisions</p> */}
                                        {
                                            this.props.version.revisions.map(revision => (
                                                <RevisionComp key={revision.id}
                                                    revision={revision}
                                                    handleFieldChange={this.handleFieldChange}
                                                    handleMinus={this.handleMinus}
                                                    handleBlur={this.handleBlur}
                                                />
                                            ))
                                        }
                                        {
                                            revisions.map((val, idx) => {
                                                let revisionId = `revision-${idx}`
                                                return (
                                                    <div key={idx} id="dynamicRevisionGroup">
                                                        {/* <Label for={revisionId} hidden>Mix Revisions</Label> */}
                                                        <InputGroup className="newRevisionGroup">
                                                            <Input
                                                                type="text"
                                                                name={revisionId}
                                                                data-id={idx}
                                                                id={revisionId}
                                                                placeholder="Add a mix revision ..."
                                                                onChange={this.handleFieldChange}
                                                                onBlur={this.handleBlur}
                                                                style={{ marginBottom: '5px' }} />
                                                            {/* <InputGroupAddon addonType="append">
                                                                <FiPlus onClick={this.addRevision} id="revisionBtn"
                                                                    style={{ margin: 'auto' }} />
                                                            </InputGroupAddon> */}
                                                        </InputGroup>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <Button onClick={this.addRevision} id="revisionBtn">+</Button> */}
                                    </FormGroup>
                                    <FiPlus onClick={this.addRevision} id="revisionBtn"
                                        style={{ margin: 'auto' }} />
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="primary" onClick={this.handlesavechangesbtn}>Save Changes</Button>{' '}
                                {/* <Button outline color="secondary" onClick={this.handlecancelbtn}>Cancel</Button> */}
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