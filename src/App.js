import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import Navbar from './components/Navbar';
import Movie from './components/Movie';
import SearchResults from './components/SearchResults';

function App() {

  const Api_key = process.env.REACT_APP_API_KEY;

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Navigate to="/popular" />} />
          <Route exact path="/popular" element={<Movie Api_key={Api_key} category='popular' />} />
          <Route exact path="/toprated" element={<Movie Api_key={Api_key} category='top_rated' />} />
          <Route exact path="/upcoming" element={<Movie Api_key={Api_key} category='upcoming' />} />
          <Route exact path="/search/:query" element={<SearchResults Api_key={Api_key} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
