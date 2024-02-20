function Track(props) {
    return (
        <div className="card lg:card-side bg-base-300 shadow-xl grow max-h-52 my-5">
            <figure className={'shrink-0'}><img
                src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
                alt="Album"
                className={'w-52 h-52 aspect-square'}
            />
            </figure>
            <div className="card-body min-h-0">
                <h2 className="card-title line-clamp-2">{props.name}</h2>
                <span className={'line-clamp-1'}>By {props.artist}</span>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    )
}

export default Track