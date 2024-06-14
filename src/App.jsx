import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutFilm from './pages/AboutFilm';
import Films from './pages/Films';
import Home from './pages/Home';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/films' element={<Films />}/>
        <Route path='/films/:filmId' element={<AboutFilm />}/>
      </Routes>
    </>
  )
}

export default App
