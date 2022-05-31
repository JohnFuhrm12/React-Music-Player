import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {
  return(
    <>
    {code ? <Dashboard code={code}/> : <Login code={code}/>}
    </>
  )
}

export default App;