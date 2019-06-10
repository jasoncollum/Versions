import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import './requestForm.css'

export default class RequestForm extends Component {

    render() {
        return (
            <Form id="requestForm">
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="songTitleInput">Song Title</Label>
                            <Input type="text" name="songTitleInput" id="songTitleInput"
                                placeholder="Enter a song title" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="versionNumberInput">Version No.</Label>
                            <Input type="text" name="versionNumberInput" id="versionNumberInput"
                                placeholder="1" />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="artistNameInput">Artist Name</Label>
                            <Input type="text" name="artistNameInput" id="artistNameInput"
                                placeholder="Enter artist name" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="mixRequestTextarea">Mix Requests</Label>
                            <Input type="textarea" name="mixRequestTextarea" id="mixRequestTextarea"
                                placeholder="Enter a mix request..." />
                        </FormGroup>
                        <Button>+</Button>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        )
    }
}
