import SpotifyApi from "./spotifyApi.js";

function SearchBar(props) {
    return (
        <form className={'flex flex-col gap-6'} onSubmit={props.handleSubmit}>
            <label className={'flex items-center input input-bordered input-accent input-lg min-h-16'}>
                <input
                    type={'text'}
                    className={'grow'}
                    placeholder={'Search song'}
                    value={props.searchValue}
                    onChange={props.handleChange}
                />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="w-6 h-6 opacity-70">
                    <path fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd"/>
                </svg>
            </label>
            <div>
                <button
                    type={'submit'}
                    className={'btn btn-wide btn-info'}
                    onClick={() => {
                        const access_token = localStorage.getItem("access_token")
                        if (access_token === 'undefined' || !access_token) {
                            document.getElementById('not_logged_in_popup').showModal()
                        }
                    }}
                >Search
                </button>

                <dialog id="not_logged_in_popup" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Not Logged In!</h3>
                        <p className="py-4">Please log in to your spotify account to use this application</p>
                        <div className="modal-action">
                            <button className="btn btn-block btn-primary" onClick={SpotifyApi.requestToken}>Login
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </form>
    )
}

export default SearchBar