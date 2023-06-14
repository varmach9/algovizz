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
import Knp from './components/Knapsack';
import Nqueen from './components/Nqueen';
import Sudoku from './components/Sudoku';
import Search from './components/Search';
import Editdis from './components/Editdis';
import TowersOfHanoi from './components/Toh';
import Footer from './components/Footer';

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
              <Route path="/knapsack" element={<Knp/>}/>
              <Route path="/nqueen" element={<Nqueen/>}/>
              <Route path="/sudoku" element={<Sudoku/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/ed" element={<Editdis/>}/>
              <Route path="/toh" element={<TowersOfHanoi/>}/>

          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
