import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import './requestForm.css'

export default class RequestForm extends Component {
    state = {
        songTitleInput: '',
        versionNumberInput: '',
        artistNameInput: '',
        requests: [{ text: '' }]
    }

    addRequest = (e) => {
        this.setState((prevState) => ({
            requests: [...prevState.requests, { text: '' }]
        }));
    }

    handleSubmit = (e) => { e.preventDefault() }

    handleFieldChange = e => {
        if (['text'].includes(e.target.className)) {
            let requests = [...this.state.requests]
            requests[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ requests }, () => console.log(this.state.requests))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

        // const stateToChange = {}
        // stateToChange[evt.target.id] = evt.target.value
        // this.setState(stateToChange)
    }

    // Dynamically add request inputs
    // addRequestInput = (parent) => {
    //     const newRequestTextarea = `<Input type="textarea" name="requestInput" className="requestInput"
    // placeholder = "Enter a mix request..." />`

    //     parent.append(newRequestTextarea)
    // }

    // move to submit button
    // pushRequests = () => {
    //     const requestInputs = document.querySelectorAll('#requestGroup textarea')
    //     requestInputs.forEach(input => {
    //         let floatState = this.state.requestInputs
    //         floatState.push(input.value)
    //         this.setState({ requestInputs: floatState })
    //     })
    // }

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
                                            {/* <Label for={requestId}>Mix Requests</Label> */}
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
