import { useEffect, useState } from 'react'

// Custom functions
import { authenticated } from '../helpers/auth'

// Custom Components
import Spinner from './common/Spinner'
import Error from './common/Error'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

// Import image
import logoHead from '../assets/logo-head.png'

const Results = () => {

  // ! State
  const [ results, setResults ] = useState([])
  const [ filteredResults, setFilteredResults ] = useState([])
  const [ currentTeamFilter, setCurrentTeamFilter ] = useState('All')
  const [ search, setSearch ] = useState('')
  const [ error, setError ] = useState('')
  const [ requestSuccessful, setRequestSuccessful ] = useState(false)

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League fixtures
    const getResults = async () => {
      try {
        const { data: { matches } } = await authenticated.get('/api/competitions/2021/matches?season=2022&status=FINISHED')
        setResults(matches)
        setRequestSuccessful(true)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getResults()
  }, [])
  
  // ! Teams Filter
  // Getting all the matchdays within the results array and setting them as options
  const getTeams = () => {
    return [...new Set(results.map(result => result.homeTeam.name && result.awayTeam.name))].sort().map(team => {
      return <option key={team} value={team}>{team}</option>
    })
  }
  
  // Filter the season with the value of each options and call the corresponding API
  const filterTeams = (value) => {
    setCurrentTeamFilter(value)
    const filteredArray = results.filter(result => result.homeTeam.name === value || result.awayTeam.name === value || value === 'All')
    setFilteredResults(filteredArray)
  }

  // ! Search Results
  const searchResults = (value) => {
    setSearch(value)
    const regex = new RegExp(search, 'i')
    const filteredArray = results.filter(result => 
      (regex.test(result.homeTeam.name) || regex.test(result.awayTeam.name)) && 
      (result.homeTeam.name === currentTeamFilter || result.awayTeam.name === currentTeamFilter || currentTeamFilter === 'All'))
    setFilteredResults(filteredArray)
  }
  
  useEffect(() => {
    filterTeams(currentTeamFilter)
    searchResults(search)
  }, [results])


  return (
    <main>
      <Container className='fixtures'>
        <Row>
          <Col xs="12" className='flex-center'>
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Results</h1>
            <p className='mb-3'>Refresh the page to update the results.</p>
          </Col>
          {/* Filter Clubs */}
          <Col xs="6">
            <Form.Group className="mb-3" controlId="formSelectTeams">
              <Form.Label>Filter by Club</Form.Label>
              <Form.Select className='mb-4' onChange={(e) => filterTeams(e.target.value)}>
                <option value='All'>All</option>
                {results.length && getTeams()}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* Search Clubs */}
          <Col xs="6">
            <Form.Group className="search mb-3" controlId="formSearchGames">
              <Form.Label>Search Results by Club Name</Form.Label>
              <div className='search-bar'>
                <Form.Control type="text" placeholder="Search..." onChange={(e) => searchResults(e.target.value)}/>
                {/* <Button className="search-button" type="submit">Search</Button> */}
              </div>
            </Form.Group>
          </Col>
          <div className='results-container'>
            {filteredResults.length > 0 ? 
              filteredResults.map(match => {
                const { id, homeTeam: { name: homeTeamName, crest: homeTeamCrest }, awayTeam: { name: awayTeamName, crest: awayTeamCrest }, utcDate, score: { fullTime: { home, away } }, matchday } = match
                // Cutting the utcDate in to just the start time of the game
                const day = utcDate.split('').slice(8, 10).join('')
                const month = utcDate.split('').slice(5, 7).join('')
                const year = utcDate.split('').slice(0, 4).join('')
                return (
                  <Col key={id} xs="12" className='results text-center'>
                    <h4 className='mb-4'>{day}-{month}-{year}</h4>
                    <h3>
                      <span className='home-team'>
                        {homeTeamName} 
                        <img className='match-crest' src={homeTeamCrest} />
                        {home}
                      </span>
                      vs 
                      <span className='away-team'>
                        {away}
                        <img className='match-crest' src={awayTeamCrest} />
                        {awayTeamName}
                      </span>
                    </h3>
                  </Col>
                )
              })
              :
              // If the request was successful but the filtered results array is empty, it means that there are no matches found.
              filteredResults.length === 0 && requestSuccessful ?
                <h2 className='text-center'>No matches were found.</h2>
                :
                // If there is an error, we print out the error on display. Else, the data is still loading, so the spinner is displayed.
                error ? 
                  <Error error={error} /> 
                  : 
                  <Spinner />
            }
          </div>
        </Row>
      </Container>
    </main>
  )
}

export default Results
