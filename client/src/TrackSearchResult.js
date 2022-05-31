export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div onClick={handlePlay}>
        <img className='album-cover' src={track.albumUrl}/>
        <div>
            <div>{track.title}</div>
            <div>{track.artist}</div>
        </div>
    </div>
    )
}