import './App.scss'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './Layouts/DefaultLayout'
import Home from './Pages/Home'
import PostingRegulation from './Pages/PostingRegulations'
import Introduce from './Pages/Introduce'
import ActiveRegulation from './Pages/Regulations'
import TermsOfUse from './Pages/TermsOfUse'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Questions from './Pages/Questions'
import InstructPost from './Pages/Instruct'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route path="trang-chu" element={<Home/>} />
          <Route path="quy-dinh-dang-tin" element={<PostingRegulation/>} />
          <Route path="gioi-thieu" element={<Introduce/>} />
          <Route path="quy-che-hoat-dinh" element={<ActiveRegulation/>} />
          <Route path="quy-dinh-su-dung" element={<TermsOfUse/>} />
          <Route path="chinh-sach-bao-mat" element = {<PrivacyPolicy/>} />
          <Route path="cau-hoi-thuong-gap" element={<Questions/>} />
          <Route path="huong-dan-dang-tin" element={<InstructPost/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
