import SpotifyPlayer from 'react-spotify-web-playback';
import { useState, useEffect } from 'react';

export default function Player( {accessToken, trackUri}) {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri])

    console.log(trackUri)

    if (!accessToken) return null
    return (
        <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        play={true}
        uris={trackUri ? [trackUri] : []}
        />
    ) 
}