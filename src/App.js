import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Layout from './Layout';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout/>} path='/'>
            <Route index element={<Home/>}/>
            <Route path='about' element={<About/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
