import React, { Component } from 'react'
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap'
import API from '../../modules/API';

import './songSetupForm.css'

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
        const songObj = await this.createSongObj(artistObj.id)
        const versionObj = await this.createVersionObj(songObj.id)
        // console.log(versionObj)
        this.props.getAllData()
    }

    // Create objects:  artist, song, and version
    createArtistObj = async () => {
        const artistCheck = await API.getArtistByName(this.state.artistNameInput)
        // Artist already in database - return artist object
        if (artistCheck.length === 1) {
            return artistCheck[0]
        }
        // Artist not in database - add artist to database, return artist object
        if (artistCheck.length === 0) {
            let newArtistObj = {
                name: this.state.artistNameInput,
                imageURL: this.state.artistImageURL
            }
            if (newArtistObj.imageURL === '') {
                newArtistObj.imageURL = "https://images.unsplash.com/photo-1561175915-509343c39f6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            }
            const result = await API.postArtist(newArtistObj)
            newArtistObj.id = result.id
            return newArtistObj
        }
    }

    createSongObj = async (artist_Id) => {
        const songCheck = await API.getSongByTitle(this.state.songTitleInput)
        // If song is in DB and matches artistObj.id
        if (songCheck.length === 1 && songCheck[0].artistId === artist_Id) {
            return songCheck[0]
        }
        // If song is in DB, but does not match artistObj.id || if song is not in DB
        if ((songCheck.length === 1 && songCheck[0].artistId !== artist_Id) || songCheck.length === 0) {
            let newSongObj = {
                title: this.state.songTitleInput,
                userId: this.props.user.id,
                artistId: artist_Id
            }
            const result = await API.postSong(newSongObj)
            newSongObj.id = result.id
            return newSongObj
        }
    }

    createVersionObj = async (songObj_Id) => {
        const versionCheck = await API.getVersionNumBySongId(this.state.versionNumberInput, songObj_Id)
        if (versionCheck.length === 1) {
            alert('Version number already exists. Please click the New Version button on the song card to create a new version of this song.')
        } else {
            let newVersionObj = {
                versionNum: parseInt(this.state.versionNumberInput, 10),
                songId: songObj_Id
            }
            const result = await API.postVersion(newVersionObj)
            newVersionObj = result
            return newVersionObj
        }
    }

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
                    <Input type="number" name="versionNumberInput" id="versionNumberInput"
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
                <FormGroup>
                    {/* <Label for="exampleFile">File</Label> */}
                    <Input type="file" name="file" id="audioFile" />
                    <FormText color="muted">
                        Upload an audio file for this version
                    </FormText>
                </FormGroup>
                <Button onClick={this.handleSubmit} outline color="primary">Submit</Button>
            </Form >
        )
    }
}
