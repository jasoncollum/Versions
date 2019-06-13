const remoteURL = "http://localhost:5002"

export default {
    getAllArtists() {
        return fetch(`${remoteURL}/artists`).then(e => e.json())
    },
    getArtist(artistName) {
        return fetch(`${remoteURL}/artists?name=${artistName}`).then(e => e.json())
    },
    postArtist(artistObj) {
        return fetch(`${remoteURL}/artists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artistObj)
        }).then(e => e.json())
    },
    getAllSongs() {
        return fetch(`${remoteURL}/songs`).then(e => e.json())
    },
    getSong(id) {
        return fetch(`${remoteURL}/songs/${id}?_embed=versions`).then(e => e.json())
    },
    postSong(songObj) {
        return fetch(`${remoteURL}/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(songObj)
        }).then(e => e.json())
    },
    getAllVersions() {
        return fetch(`${remoteURL}/versions`).then(e => e.json())
    },
    getVersion(songId) {
        return fetch(`${remoteURL}/versions?songId=${songId}`).then(e => e.json())
    },
    postVersion(versionObj) {
        return fetch(`${remoteURL}/versions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(versionObj)
        }).then(e => e.json())
    },
    getAllRequests() {
        return fetch(`${remoteURL}/requests`).then(e => e.json())
    },
    getRequests(versionId) {
        return fetch(`${remoteURL}/requests?versionId=${versionId}&_embed=revisions`).then(e => e.json())
    },
    postRequest(requestObj) {
        return fetch(`${remoteURL}/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObj)
        }).then(e => e.json())
    }
}