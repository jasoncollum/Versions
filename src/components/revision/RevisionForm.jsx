import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, InputGroup } from 'reactstrap'
import { FiPlus } from 'react-icons/fi'

import './revisionForm.css'

export default class RevisionForm extends Component {
    state = {
        revisions: [{ text: '' }],
        revisionInputText: []
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

        // Create array of objects with revisionText: revision
        const revisionArr = this.state.revisionInputText.map(revision => {
            return { revisionText: revision }
        })
    }

    // Create revision objects
    createRevisionObjArr = (strArr) => {
        return {
            revisionText: this.state.revisionInputText
        }
    }

    render() {
        let { revisions } = this.state

        return (
            <Form id="revisionForm">
                <FormGroup>
                    <Input type="text" name="songTitleInput" id="songTitleInput"
                        placeholder="Song Title"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="versionNumberInput" id="versionNumberInput"
                        placeholder="Version No."
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="artistNameInput" id="artistNameInput"
                        placeholder="Artist Name"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="artistImageURL" id="artistImageURLInput"
                        placeholder="Artist Image URL"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup id="revisionGroup">
                    <p>Mix Revisions</p>
                    {
                        revisions.map((val, idx) => {
                            let revisionId = `revision-${idx}`
                            return (
                                <div key={idx}>
                                    <InputGroup className="newRevision">
                                        <Input
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
                </FormGroup>
                <Button onClick={this.handleSubmit} outline color="secondary">Submit</Button>
                <FiPlus onClick={this.addRevision} id="revisionBtn"
                    style={{ marginTop: '12px' }} />
            </Form >
        )
    }
}