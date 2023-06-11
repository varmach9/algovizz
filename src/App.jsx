import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Sorting from './components/Sorting';
import Home from './pages/Home';
import Graphs from './components/Graphs';
import Paths from "./components/Paths"
import Primenumber from "./components/Primenumber"
import Twosum from './components/Tarsum';
import Cpu from "./components/Cpu";
import Lcs from "./components/Lcs"

function App() {
  return (
      <BrowserRouter>
      <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sort" element={<Sorting />}/>
              <Route path="/graph" element={<Graphs/>}/>
              <Route path="/pathfind" element={<Paths/>}/>
              <Route path="/primefinder" element={<Primenumber/>}/>
              <Route path="/tar-sum" element={<Twosum/>}/>
              <Route path="/cpu" element={<Cpu/>}/>
              <Route path="/lcs" element={<Lcs/>}/>

          </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
