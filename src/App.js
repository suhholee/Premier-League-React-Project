import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import PageNavbar from './components/common/PageNavbar'
import PageNotFound from './components/common/PageNotFound'
import Home from './components/Home'
import CurrentTable from './components/CurrentTable'
import Fixtures from './components/Fixtures'
import Results from './components/Results'

const App = () => {
  // Add slash in the beginning of the request ie) /v4/competitions
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        {/* <PageNavbar /> */}
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Results />} />
          <Route path="/table" element={<CurrentTable />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
