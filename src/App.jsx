import './App.scss'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './Layouts/DefaultLayout'
import Home from './Pages/Home'
import PostingRegulation from './Pages/PostingRegulations'
import Introduce from './Pages/Introduce'
import ActiveRegulation from './Pages/Regulations'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route path="trang-chu" element={<Home/>} />
          <Route path="quy-dinh-dang-tin" element={<PostingRegulation/>} />
          <Route path="gioi-thieu" element={<Introduce/>} />
          <Route path="quy-che-dang-tin" element={<ActiveRegulation/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
