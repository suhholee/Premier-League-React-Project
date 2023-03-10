// Import image
import logoHead from '../assets/logo-head.png'

const Home = () => {
  return (
    <main>
      <h1 className='display-5 text-center mt-3 mb-4 fw-bold'><img src={logoHead} />Welcome to Premier League Today!</h1>
      <p className='lead'>Explore the website to see the current Premier League table, today&#39;s fixtures, and past results.</p>
    </main>
  )
}

export default Home