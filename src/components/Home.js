import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// Import image
import logoHead from '../assets/logo-head.png'

const Home = () => {
  return (
    <main className='home'>
      <div className='hero'>
        <h1 className='display-4 text-center mt-3 mb-4 fw-bold'><img src={logoHead} />Welcome to Premier League Today!</h1>
        <p className='lead display-6 mb-5'>Explore the website to see...</p>
        <Button to="/table" as={Link} className='button display-6'>Current Premier League Table</Button>
        <Button to="/fixtures" as={Link} className='button display-6'>Today&#39;s Fixtures</Button>
        <Button to="/results" as={Link} className='button display-6'>Past Results</Button>
      </div>
    </main>
  )
}

export default Home