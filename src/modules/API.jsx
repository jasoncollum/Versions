const remoteURL = "http://localhost:5002"

export default {
    // ARTISTS
    getAllArtists() {
        return fetch(`${remoteURL}/artists`).then(e => e.json())
    },
    getArtistByName(artistName) {
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
    // SONGS
    getAllSongs() {
        return fetch(`${remoteURL}/songs`).then(e => e.json())
    },
    getSong(id) {
        return fetch(`${remoteURL}/songs${id}?_embed=versions`).then(e => e.json())
    },
    getSongByTitle(songTitle) {
        return fetch(`${remoteURL}/songs?title=${songTitle}`).then(e => e.json())
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
    deleteSong(songId) {
        return fetch(`${remoteURL}/songs/${songId}`, {
            method: "DELETE"
        }).then(e => e.json())
    },
    // VERSIONS
    getAllVersions() {
        return fetch(`${remoteURL}/versions`).then(e => e.json())
    },
    getVersion(songId) {
        return fetch(`${remoteURL}/versions?songId=${songId}`).then(e => e.json())
    },
    getVersionNumBySongId(version_Num, song_Id) {
        return fetch(`${remoteURL}/versions?versionNum=${version_Num}&songId=${song_Id}`).then(e => e.json())
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
    updateVersion(versionId, updatedVersionObj) {
        return fetch(`${remoteURL}/versions/${versionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedVersionObj)
        }).then(e => e.json())
    },
    deleteVersion(versionId) {
        return fetch(`${remoteURL}/versions/${versionId}`, {
            method: "DELETE"
        }).then(e => e.json())
    },
    // REVISIONS
    getAllRevisions() {
        return fetch(`${remoteURL}/revisions`).then(e => e.json())
    },
    getRevisions(versionId) {
        return fetch(`${remoteURL}/revisions?versionId=${versionId}`).then(e => e.json())
    },
    postRevision(revisionObj) {
        return fetch(`${remoteURL}/revisions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(revisionObj)
        }).then(e => e.json())
    },
    updateRevision(revisionId, updatedRevisionObj) {
        return fetch(`${remoteURL}/revisions/${revisionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRevisionObj)
        }).then(e => e.json())
    },
    deleteRevision(revisionId) {
        return fetch(`${remoteURL}/revisions/${revisionId}`, {
            method: "DELETE"
        }).then(e => e.json())
    }
}