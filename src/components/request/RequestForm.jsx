import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import './requestForm.css'

export default class RequestForm extends Component {
    state = {
        songTitleInput: '',
        versionNumberInput: '',
        artistNameInput: '',
        requestInput: ''
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        console.log(this.state)
        return (
            <Form id="requestForm">
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
                <Row form>
                    <Col md={12}>
                        <FormGroup id="requestGroup">
                            <Label for="requestInput">Mix Requests</Label>
                            <Input type="textarea" name="requestInput" id="requestInput"
                                placeholder="Enter a mix request..."
                                onChange={this.handleFieldChange} />
                        </FormGroup>
                        <Button id="requestBtn">+</Button>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        )
    }
}
