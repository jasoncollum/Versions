const remoteURL = "http://localhost:5002"

export default {
    getSong(id) {
        return fetch(`${remoteURL}/songs/${id}?_embed=versions`).then(e => e.json())
    },
    getVersion(songId) {
        return fetch(`${remoteURL}/versions?songId=${songId}`).then(e => e.json())
    },
    // getVersions(id) {
    //     return fetch(`${remoteURL}/songs/${id}/versions`).then(e => e.json())
    // },
    getRequests(versionId) {
        return fetch(`${remoteURL}/requests?versionId=${versionId}&_embed=revisions`).then(e => e.json())
    }
}