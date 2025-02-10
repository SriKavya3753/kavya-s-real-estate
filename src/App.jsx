import Header from './components/Header/Header'
import Hero from './components/Hero/hero';
import Companies from './components/Companies/Companies';
import Residencies from './components/Residencies/Residencies';
import './App.css'
function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"></div>
        <Header/>
        <Hero/>
      </div>
      <Companies/>
      <Residencies/>
    </div>
  );
}

export default App;
