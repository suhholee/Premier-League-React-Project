import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'

const App = () => {
  // Add slash in the beginning of the request ie) /v4/competitions
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        {/* <PageNavbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
