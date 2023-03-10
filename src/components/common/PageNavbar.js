import { useEffect } from 'react'
// Import Link for use as nav links
import { Link, useLocation } from 'react-router-dom'

// React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

// Import image
import logo from '../../assets/logo.png'

const PageNavbar = () => {
  // ! Location variables
  const location = useLocation()

  useEffect(() => {
    // console.log(location)
  }, [location])

  return (
    <Navbar expand="md">
      <Container> 
        <Navbar.Brand to="/" as={Link}><img src={logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="premier-league-nav" className='navbar-dark' />
        <Navbar.Collapse id="premier-league-nav" className='justify-content-end'>
          <Nav>
            <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'square border-bottom border-white' : ''}>Home</Nav.Link>
            <Nav.Link to="/table" as={Link} className={location.pathname === '/table' ? 'square border-bottom border-white' : ''}>Table</Nav.Link>
            <Nav.Link to="/fixtures" as={Link} className={location.pathname === '/fixtures' ? 'square border-bottom border-white' : ''}>Fixtures</Nav.Link>
            <Nav.Link to="/results" as={Link} className={location.pathname === '/results' ? 'square border-bottom border-white' : ''}>Results</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar