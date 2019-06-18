import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, InputGroup } from 'reactstrap'
import { FiMinus, FiPlus } from 'react-icons/fi'

import './revisionForm.css'

export default class RevisionForm extends Component {
    state = {
        songTitleInput: '',
        versionNumberInput: '',
        artistNameInput: '',
        revisions: [{ text: '' }],
        revisionInputText: []
    }

    addRevision = (e) => {
        this.setState((prevState) => ({
            revisions: [...prevState.revisions, { text: '' }]
        }));
    }

    // push all revision text to revisionInputText array in state
    pushRevisions = () => {
        const revisionInputs = document.querySelectorAll('.newRevision input')
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
        if (!e.target.id.includes('-')) {
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

    render() {
        let { revisions } = this.state

        return (
            <Form id="revisionForm">
                {/* <Row form>
                    <Col md={6}> */}
                <FormGroup>
                    {/* <Label for="songTitleInput">Song Title</Label> */}
                    <Input type="text" name="songTitleInput" id="songTitleInput"
                        placeholder="Song Title"
                        onChange={this.handleFieldChange} />
                </FormGroup>
                {/* </Col>
                    <Col md={2}> */}
                <FormGroup>
                    {/* <Label for="versionNumberInput">Version No.</Label> */}
                    <Input type="text" name="versionNumberInput" id="versionNumberInput"
                        placeholder="Version No."
                        onChange={this.handleFieldChange} />
                </FormGroup>
                {/* </Col>
            <Col md={4}> */}
                <FormGroup>
                    {/* <Label for="artistNameInput">Artist Name</Label> */}
                    <Input type="text" name="artistNameInput" id="artistNameInput"
                        placeholder="Artist Name"
                        onChange={this.handleFieldChange} />
                </FormGroup>
                {/* </Col>
                </Row > */}
                {/* <hr></hr> */}
                {/* < Row form >
                <Col md={12}> */}
                <FormGroup id="revisionGroup">
                    <p>Mix Revisions</p>
                    {
                        revisions.map((val, idx) => {
                            let revisionId = `revision-${idx}`
                            return (
                                <div key={idx}>
                                    {/* <Label for={revisionId} hidden>Mix Revisions</Label> */}
                                    <InputGroup className="newRevision">
                                        <Input
                                            // type="textarea"
                                            type="text"
                                            name={revisionId}
                                            data-id={idx}
                                            id={revisionId}
                                            placeholder="Enter a mix revision..."
                                            onChange={this.handleFieldChange} />
                                    </InputGroup>
                                </div>
                            )
                        })
                    }
                    {/* <Button onClick={this.addRevision} id="revisionBtn">+</Button> */}
                </FormGroup>
                {/* </Col>
                </Row > */}
                <Button onClick={this.handleSubmit} outline color="secondary">Submit</Button>
                <FiPlus onClick={this.addRevision} id="revisionBtn"
                    style={{ marginTop: '12px' }} />
            </Form >
        )
    }
}