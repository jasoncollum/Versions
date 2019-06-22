import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
        console.log(versionObj)
        this.props.getAllData()

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
            await API.postSong(newSongObj).then(result => {
                newSongObj = result
            })
            return newSongObj
        }
    }

    createVersionObj = async (songObj_Id) => {
        const versionCheck = await API.getVersionNumBySongId(this.state.versionNumberInput, songObj_Id)
        if (versionCheck.length === 1) {
            console.log('Redirect to version card to create a new version')
        } else {
            let newVersionObj = {
                versionNum: parseInt(this.state.versionNumberInput, 10),
                songId: songObj_Id
            }
            const result = await API.postVersion(newVersionObj)
            newVersionObj.id = result.id
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
