import React, { useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/constant';
import Spotify from './components/Spotify';

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split('&')[0].split('=')[1];

      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Spotify /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
