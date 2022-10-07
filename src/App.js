import './App.css';
import Header from './Header';
import FetchArtistData from './FetchArtistData';
import FetchExhibitionData from './FetchExhibitionData';

function App() {
  return (
    <div className='App'>
      <Header />
      <FetchArtistData />
      <br></br>
      <br></br>
      <br></br>
      <FetchExhibitionData />
    </div>
  );
}

export default App;
