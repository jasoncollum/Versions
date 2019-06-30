import React, { Component } from 'react'
import API from '../../modules/API';
import RevisionComp from './RevisionComp'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, FormText } from 'reactstrap'
import { FiPlus } from 'react-icons/fi'
import * as firebase from 'firebase/app'
import 'firebase/storage'

import 'bootstrap/dist/css/bootstrap.css';
import './versionDetail.css'


export default class VersionDetail extends Component {
    storageRef = firebase.storage().ref('audio')

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            revisions: [{ text: '' }],
            updatedRevisionIds: [],
            removeRevisionIds: [],
            newRevisionInputText: [],
            audio: null,
            hide: true,
            hidePlayer: true,
            hideSaveBtn: false
        };

        this.toggle = this.toggle.bind(this);
        this.handlesavechangesbtn = this.handlesavechangesbtn.bind(this)
    }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }))
    }

    handlesavechangesbtn = async (e) => {
        e.preventDefault()
        this.setState({
            hide: false,
            hideSaveBtn: true
        })
        if (this.state.audio) {
            let audioFbURL = await this.createAudioURL()
            this.afterSaveChanges(audioFbURL)
        } else {
            let noAudioURL = ''
            this.afterSaveChanges(noAudioURL)
        }
        this.toggle()
    }

    createAudioURL = async () => {
        const ref = this.storageRef.child(`${Date.now()}`)

        const audioFbURL = await ref.put(this.state.audio)
            .then(data => data.ref.getDownloadURL())
            .catch(response => console.log('unable to upload file'))
        console.log('Firebase URL::', audioFbURL)
        return audioFbURL
    }

    afterSaveChanges = async (audio_URL) => {
        const audioUrlObj = { audioURL: audio_URL }
        const audioAdded = await API.updateVersion(this.props.version.id, audioUrlObj)
        await this.props.getAllData()
        this.props.history.push(`/songList/${this.props.version.id}`)
    }

    // handlecancelbtn() {
    //     this.setState(prevState => ({
    //         modal: !prevState.modal,
    //         revisions: [{ text: '' }]
    //     }))
    // }

    newRevisionsArray = []

    handleDeleteBtn = async () => {
        // console.log('delete version')
        this.props.deleteVersion(this.props.version.id)
    }

    handleMinus = (revisionId) => {
        // console.log('minus icon', revisionId)
        API.deleteRevision(revisionId).then(() => console.log('revision deleted:'))
    }

    handleBlur = (e) => {
        const target = e.target;
        // console.log('Blur', e.target.id, e.target.value)
        // Check if previously existing revision and update edited revision
        if (e.target.type === 'text' && !e.target.id.includes('-') && e.target.value) {
            const updatedRevision = { revisionText: e.target.value }
            API.updateRevision(e.target.id, updatedRevision)
        }
        // Check if previously existing revision, but now has no text value, and delete revision
        if (e.target.type === 'text' && !e.target.id.includes('-') && !e.target.value) {
            API.deleteRevision(e.target.id)
        }
        // Check if new revision
        if (e.target.type === 'text' && e.target.id.includes('-') && e.target.value) {
            // Create newRevisionObject, Post to database and return result
            const newRevisionObject = {
                revisionText: e.target.value,
                versionId: this.props.version.id,
                songId: this.props.version.songId
            }
            API.postRevision(newRevisionObject).then((result) => {
                // console.log('Posted NEW Revision', result)
                target.id = result.id
            })
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
    // pushNewRevisions = () => {
    //     const newRevisionInputs = document.querySelectorAll('.newRevisionGroup input')
    //     newRevisionInputs.forEach(input => {
    //         let floatState = this.state.newRevisionInputText
    //         if (input.value !== '') {
    //             floatState.push(input.value)
    //             this.setState({ newRevisionInputText: floatState })
    //         }
    //     })
    // }

    handleFieldChange = e => {
        if (['text'].includes(e.target.className)) {
            let revisions = [...this.state.revisions]
            revisions[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ revisions }, () => console.log('revisions', this.state.revisions))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    // componentDidMount() {
    //     console.log('VersionDetail mounted')
    // }

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
            const hide = this.state.hide ? 'none' : '';
            let hidePlayer = this.state.hidePlayer ? 'none' : '';
            if (this.props.version.audioURL) {
                hidePlayer = '';
            }
            let { revisions } = this.state
            const hideSaveBtn = this.state.hideSaveBtn ? 'none' : '';
            return (
                <section className="versionDetail" style={{ width: '500px' }}>
                    <div className="card-body">
                        <div className="song-info">
                            <div className="title-version">
                                <h4 className="card-title">{this.props.version.song.title}</h4>
                                <h5 className="card-title">Version {this.props.version.versionNum}</h5>
                                <audio id="audioPlayer" controls controlsList="nodownload"
                                    style={{ display: `${hidePlayer}` }}>
                                    <source src={this.props.version.audioURL}
                                        type="audio/mp3" />
                                </audio>
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
                                    </FormGroup>
                                    <FiPlus onClick={this.addRevision} id="revisionBtn"
                                        style={{ margin: 'auto' }} />
                                    <FormGroup>
                                        {/* <Label for="audioFile">File</Label> */}
                                        <Input type="file" name="audio" id="audioFile"
                                            onChange={(e) => this.setState({ audio: e.target.files[0] })} />
                                        <FormText color="muted">
                                            Upload an audio file for this version
                    </FormText>
                                    </FormGroup>
                                </Form>
                                <div className="loader" style={{ display: `${hide}` }}
                                ></div>
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="primary" onClick={this.handlesavechangesbtn}
                                    style={{ display: `${hideSaveBtn}` }}>Save Revisions</Button>{' '}
                                {/* <Button outline color="secondary" onClick={this.handlecancelbtn}>Cancel</Button> */}
                            </ModalFooter>
                        </Modal>
                    </div>
                </section >
            )
        } else {
            return null
        }
    }
}