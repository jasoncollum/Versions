import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './songSetupForm.css'
import API from '../../modules/API';

export default class SongSetupForm extends Component {
    state = {
        songTitleInput: '',
        versionNumberInput: '',
        artistNameInput: '',
        artistImageURL: ''
    }

    handleFieldChange = e => {
        if (e.target.value !== '') {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        // post to db
        const artistObj = await this.createArtistObj()
        // const songObj = this.createSongObj()
        // const versionObj = this.createVersionObj()

        console.log(artistObj)
        // console.log(artistObj, songObj, versionObj)
        // this.props.saveSongSetupForm(artistObj, songObj, versionObj)
    }

    // Create objects:  artist, song, and version
    createArtistObj = async () => {

        const artistCheck = await API.getArtistByName(this.state.artistNameInput)
        if (artistCheck.length === 1) {
            return artistCheck[0]
        }
        if (artistCheck.length === 0) {
            let newArtistObj = {
                name: this.state.artistNameInput,
                imageURL: this.state.artistImageURL
            }
            await API.postArtist(newArtistObj).then(result => {
                newArtistObj = { result }
            })
            return newArtistObj
        }
    }

    // createSongObj = () => {
    //     return {
    //         title: this.state.songTitleInput,
    //         userId: this.props.user.id
    //     }
    // }

    // createVersionObj = () => {
    //     return {
    //         versionNum: parseInt(this.state.versionNumberInput)
    //     }
    // }

    render() {
        return (
            <Form id="songSetupForm">

                <FormGroup>
                    {/* <Label for="songTitleInput">Song Title</Label> */}
                    <Input type="text" name="songTitleInput" id="songTitleInput"
                        placeholder="Song Title"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    {/* <Label for="versionNumberInput">Version No.</Label> */}
                    <Input type="text" name="versionNumberInput" id="versionNumberInput"
                        placeholder="Version No."
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    {/* <Label for="artistNameInput">Artist Name</Label> */}
                    <Input type="text" name="artistNameInput" id="artistNameInput"
                        placeholder="Artist Name"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    {/* <Label for="artistNameInput">Artist Name</Label> */}
                    <Input type="text" name="artistImageURL" id="artistImageURLInput"
                        placeholder="Artist Image URL"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <Button onClick={this.handleSubmit} outline color="secondary">Submit</Button>
            </Form >
        )
    }
}
