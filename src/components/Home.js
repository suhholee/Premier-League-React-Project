// Import image
import logoHead from '../assets/logo-head.png'

const Home = () => {
  return (
    <main className='home'>
      <div className='hero'>
        <h1 className='display-4 text-center mt-3 mb-4 fw-bold'><img src={logoHead} />Welcome to Premier League Today!</h1>
        <p className='lead display-6'>Explore the website to see...</p>
      </div>
    </main>
  )
}

export default Home