const clientId = '6d3cff363c17438f8bbcdf9537bc16b3';
const redirectUri = 'https://lucilorate.me/sound-sphere/';
const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload';
const authUrl = new URL("https://accounts.spotify.com/authorize")

const SpotifyApi = {
    // Creates a random string for tge code verifier
    generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const values = crypto.getRandomValues(new Uint8Array(length))
        return values.reduce((acc, x) => acc + possible[ x % possible.length ], "")
    },

    // Hashes the code verifier using the SHA256 algorithm
    async sha256(plain) {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    },

    // returns the base64 representation of an input
    base64encode(input) {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    },

    async requestToken() {
        const codeVerifier = SpotifyApi.generateRandomString(64);
        const hashed = await SpotifyApi.sha256(codeVerifier)
        const codeChallenge = SpotifyApi.base64encode(hashed);

        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    },

    async getToken(code, storageState) {
        try {
            let codeVerifier = localStorage.getItem('code_verifier');

            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    code_verifier: codeVerifier,
                }),
            }

            const body = await fetch('https://accounts.spotify.com/api/token', payload);
            const response = await body.json();

            console.log(response.access_token)

            response.access_token !== undefined ? localStorage.setItem('access_token', response.access_token) : console.log('no token')
            response.refresh_token !== undefined ? localStorage.setItem('refresh_token', response.refresh_token) : console.log('no refresh token')

        } catch (error) {
            console.log(error);
        }

        await SpotifyApi.getCurrentUser(storageState)
    },

    async getRefreshToken() {

        // refresh token that has been previously stored
        const refreshToken = localStorage.getItem('refresh_token');
        const url = "https://accounts.spotify.com/api/token";
        console.log(`using refresh token to get new access token, old refresh_token: ${refreshToken}, old access_token: ${localStorage.getItem('access_token')}`)

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            }),
        }
        const body = await fetch(url, payload);
        console.log(`body: ${body}`)
        const response = await body.json();

        console.log(`response object: ${response}`)
        console.log(`new refresh: ${response.refreshToken}, new access: ${response.accessToken}`);
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
    },

    async apiSearchTracks(query) {
        const accessToken = localStorage.getItem('access_token');
        const endpoint = 'https://api.spotify.com/v1/search'
        const callUrl = `${endpoint}?q=${query}&type=track`

        let response = await fetch(callUrl, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        if (response.status === 401) {
            console.log('token expired, requesting new token')
            await SpotifyApi.getRefreshToken()

            response = await fetch(callUrl, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }

        return await response.json()
    },

    async getCurrentUser(storageState) {
        const accessToken = localStorage.getItem('access_token');
        const endpoint = 'https://api.spotify.com/v1/me'

        let body = await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        let response = await body.json()
        console.log(response)
        localStorage.setItem('user_id', response.id)
        storageState(response)
    },

    async createPlaylist(userId, tracks, name) {
        const accessToken = localStorage.getItem('access_token');
        const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
        const description = 'Playlist made with SoundSphere'

        const payload = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                public: false
            })
        }

        console.log("Payload:", payload); // Log the payload for debugging

        try {
            let response = await fetch(endpoint, payload);

            if (response.ok) {
                // Successfully created playlist
                let playlistData = await response.json();
                console.log("Playlist created:", playlistData);
                await SpotifyApi.addTracksToPlaylist(playlistData.id, tracks);

            } else {
                console.error('Error creating playlist:', response.status, response.statusText);
                let errorData = await response.text(); // Try getting error text
                console.log("Error Response:", errorData);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },

    async addTracksToPlaylist(playlistId, tracks) {
        const accessToken = localStorage.getItem('access_token');
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

        console.log('tracks', tracks)

        const trackUris = tracks.map((track) => (
            track.uri
        ))

        const payload = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: trackUris,
                position: 0
            })
        }

        console.log("Adding Tracks Payload:", payload); // Log the payload for debugging

        try {
            let response = await fetch(endpoint, payload);

            if (response.ok) {
                console.log("Tracks successfully added")
            } else {
                console.error('Error adding tracks', response.status, response.statusText);
                let errorData = await response.text();
                console.log('Error Response:', errorData)
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
}

export default SpotifyApi


