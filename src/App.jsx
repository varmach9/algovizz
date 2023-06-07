import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sorting from './components/Sorting';
import Home from './pages/Home';
import Graphs from './components/Graphs';
import Paths from "./components/Paths"
import Primenumber from "./components/Primenumber"
import Twosum from './components/Tarsum';

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
              <Route path="/pathfind" element={<Paths/>}/>
              <Route path="/primefinder" element={<Primenumber/>}/>
              <Route path="/tar-sum" element={<Twosum/>}/>

          </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
