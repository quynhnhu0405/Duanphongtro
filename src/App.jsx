import './App.scss'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './Layouts/DefaultLayout'
import Home from './Pages/Home'
import PostingRegulation from './Pages/PostingRegulations'
import Introduce from './Pages/Introduce'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route path="trang-chu" element={<Home/>} />
          <Route path="quy-dinh-dang-tin" element={<PostingRegulation/>} />
          <Route path="gioi-thieu" element={<Introduce/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
