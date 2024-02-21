function Track(props) {
    const artists = props.artists.map((artist) => (
        artist.name
    ))

    console.log(artists)


    return (
        <div className="card lg:card-side bg-base-300 shadow-xl grow max-h-28 my-5 outline outline-2 rounded">
            <figure className={'shrink-0'}><img
                src={props.img}
                alt="Album"
                className={'h-28 object-contain'}
            />
            </figure>
            <div className="card-body min-h-0 py-4 ps-4">
                <h2 className="card-title line-clamp-2">{props.name}</h2>
                <span className={'line-clamp-1'}>{artists.join(', ')}</span>
            </div>
            <div className="card-actions justify-center flex-col mr-4">
                <button className="btn btn-primary h-20 w-20 text-xl">Add</button>
            </div>
        </div>
    )
}

export default Track