function PlaylistTrack(props) {
    const artists = props.artists.map((artist) => (
        artist.name
    ))

    const handleRemoveTrack = () => {
        props.removeTrack(props.id)
    }

    return (
        <div className="card lg:card-side bg-base-300 shadow-xl grow max-h-16 my-5 rounded">
            <figure className={'shrink-0'}><img
                src={props.img}
                alt="Album"
                className={'h-12 object-contain'}
            />
            </figure>
            <div className="card-body min-h-0 py-0.5 ps-4 gap-0">
                <h2 className="card-title line-clamp-1 text-base">{props.name}</h2>
                <span className={'line-clamp-1 text-xs'}>{artists.join(', ')}</span>
            </div>
            <div className="card-actions justify-center flex-col">
                <button className="btn btn-square btn-primary rounded no-animation" onClick={handleRemoveTrack}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default PlaylistTrack;