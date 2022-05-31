import './App.css';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=0f42a63aa2ea439caa4ad5d825145d9c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="Loginbtn" href={AUTH_URL}>Login With Spotify</a>
      </header>
    </div>
  );
}

export default Login;