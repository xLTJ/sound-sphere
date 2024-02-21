const clientId = '6d3cff363c17438f8bbcdf9537bc16b3';
const redirectUri = 'http://localhost:5173/';
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

    async getToken(code) {
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

        } catch (error) {
            console.log(error);
        }
    },

    async apiSearchTracks(query) {
        const accessToken = localStorage.getItem('access_token');
        const endpoint = 'https://api.spotify.com/v1/search'
        const callUrl = `${endpoint}?q=${query}&type=track`

        const response = await fetch(callUrl, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = await response.json();
        return data
    }
}

export default SpotifyApi


