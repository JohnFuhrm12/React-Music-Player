import { useState, useEffect } from 'react';
import './App.css';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyAPI = new SpotifyWebApi({
  clientId: '0f42a63aa2ea439caa4ad5d825145d9c',
})

function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyAPI.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return 

    let cancel = false
    spotifyAPI.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image
          return smallest
        }, track.album.images[0])

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        }
      })
      )
    })

    return () => cancel = true
  }, [search, accessToken])

  return (
    <>
    <div className='search-bar'>
      <form>
        <input 
          type='search'
          placeholder='Search Songs/Artists' 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          />
      </form>
    </div>
    <div className='songs-section'>
      {searchResults.map(track => (
        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
      ))}
    </div>
    <div>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
    </div>
    </>
  );
}

export default Dashboard;