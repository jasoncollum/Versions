import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, } from 'reactstrap'
import RevisionBlock from './RevisionBlock'

import './revisionForm.css'

export default class RevisionForm extends Component {
    state = {
        revisions: [{ text: '' }],
        revisionInputText: []
    }

    artist = this.props.requestFormObj.artist
    song = this.props.requestFormObj.song
    version = this.props.requestFormObj.version
    requests = this.props.requestFormObj.requests

    // addRevision = (e) => {
    //     this.setState((prevState) => ({
    //         revisions: [...prevState.revisions, { text: '' }]
    //     }));
    // }

    // push all revision text to revisionInputText array in state
    // HOW CAN I GROUP REVISIONS WITH CORRESPONDING REQUEST ???
    // pushRevisions = () => {
    //     const revisionInputs = document.querySelectorAll('.revisionGroup textarea')
    //     revisionInputs.forEach(input => {
    //         let floatState = this.state.revisionInputText
    //         floatState.push(input.value)
    //         this.setState({ revisionInputText: floatState })
    //     })
    // }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     this.pushRevisions()

    //     // post to db
    //     const revisionArr = this.state.revisionInputText.map(revision => {
    //         return { revisionText: revision }
    //     })

    //     this.props.saveRevisionForm(revisionArr)
    // }

    // handleFieldChange = e => {
    //     if (['text'].includes(e.target.className)) {
    //         let revisions = [...this.state.revisions]
    //         revisions[e.target.dataset.id][e.target.className] = e.target.value
    //         this.setState({ revisions }, () => console.log(this.state.revisions))
    //     }
    // }

    // createRevisionObjArr = (strArr) => {
    //     return {
    //         revisionText: this.state.revisionInputText
    //     }
    // }


    render() {
        console.log(this.requests)
        return (
            <Form id="requestForm">
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="songTitleInput">{this.song.title} - Version {this.version.versionNum}</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="artistNameInput">{this.artist.name}</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <hr></hr>
                <Row form>
                    {
                        this.requests.map(request => {
                            return <RevisionBlock key={request.id} request={request} requests={this.requests} {...this.props}></RevisionBlock>
                        })
                    }
                </Row>
                <Button onSubmit={this.handleSubmit}>Save</Button>
            </Form>
        )
    }
}