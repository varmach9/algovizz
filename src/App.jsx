import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sorting from './components/Sorting';
import Home from './pages/Home';
import Menu from './components/Menu';
import Graphs from './components/Graphs';

function App() {
  return (
    // <div className='App'>
    //   <Header/>
    //   <Sorting/>
    // </div>
    
      <BrowserRouter>
      <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sort" element={<Sorting />}/>
              <Route path="/graph" element={<Graphs/>}/>

          </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
