import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, } from 'reactstrap'
// import API from '../../modules/API'
import './requestForm.css'

export default class RequestForm extends Component {
    state = {
        songTitleInput: '',
        versionNumberInput: '',
        artistNameInput: '',
        requests: [{ text: '' }],
        requestInputText: []
    }

    addRequest = (e) => {
        this.setState((prevState) => ({
            requests: [...prevState.requests, { text: '' }]
        }));
    }

    // push all request text to requestText array in state
    pushRequests = () => {
        const requestInputs = document.querySelectorAll('#requestGroup textarea')
        requestInputs.forEach(input => {
            let floatState = this.state.requestInputText
            floatState.push(input.value)
            this.setState({ requestInputText: floatState })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.pushRequests()

        // post to db
        const artistObj = this.createArtistObj()
        const songObj = this.createSongObj()
        const versionObj = this.createVersionObj()
        const requestArr = this.state.requestInputText.map(request => {
            return { requestText: request }
        })
        console.log(requestArr)

        this.props.saveRequestForm(artistObj, songObj, versionObj, requestArr)

    }

    handleFieldChange = e => {
        if (['text'].includes(e.target.className)) {
            let requests = [...this.state.requests]
            requests[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ requests }, () => console.log(this.state.requests))
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

    createRequestObjArr = (strArr) => {
        return {
            requestText: this.state.requestInputText
        }
    }

    render() {
        let { requests } = this.state
        console.log(this.state)

        return (
            <Form onSubmit={this.handleSubmit} id="requestForm">
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="songTitleInput">Song Title</Label>
                            <Input type="text" name="songTitleInput" id="songTitleInput"
                                placeholder="Enter a song title"
                                onChange={this.handleFieldChange} />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="versionNumberInput">Version No.</Label>
                            <Input type="text" name="versionNumberInput" id="versionNumberInput"
                                placeholder="1"
                                onChange={this.handleFieldChange} />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="artistNameInput">Artist Name</Label>
                            <Input type="text" name="artistNameInput" id="artistNameInput"
                                placeholder="Enter artist name"
                                onChange={this.handleFieldChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <hr></hr>
                <Row form>
                    <Col md={12}>
                        <FormGroup id="requestGroup">
                            <p>Mix Requests</p>
                            {
                                requests.map((val, idx) => {
                                    let requestId = `request-${idx}`
                                    return (
                                        <div key={idx}>
                                            <Label for={requestId} hidden>Mix Requests</Label>
                                            <Input
                                                type="textarea"
                                                name={requestId}
                                                data-id={idx}
                                                id={requestId}
                                                placeholder="Enter a mix request..."
                                                onChange={this.handleFieldChange} />
                                        </div>
                                    )
                                })
                            }
                            <Button onClick={this.addRequest} id="requestBtn">+</Button>
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        )
    }
}
