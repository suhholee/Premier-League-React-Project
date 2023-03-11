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
  const [ currentMatchdayFilter, setCurrentMatchdayFilter ] = useState('All')
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League fixtures
    const getResults = async () => {
      try {
        const { data: { matches } } = await authenticated.get('/competitions/2021/matches?season=2022&status=FINISHED')
        setResults(matches)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getResults()
  }, [])

  // ! Matchday Filter
  // Getting all the matchdays within the results array and setting them as options
  const getMatchday = () => {
    return [...new Set(results.map(result => result.matchday))].sort((a, b) => b - a).map(matchday => {
      return <option key={matchday} value={matchday}>Matchday {matchday}</option>
    })
  }

  useEffect(() => {
    filterMatchday(currentMatchdayFilter)
  }, [results])

  // Filter the season with the value of each options and call the corresponding API
  const filterMatchday = (value) => {
    setCurrentMatchdayFilter(value)
    const filteredArray = results.filter(result => result.matchday === value || value === 'All')
    console.log(filteredArray)
    setFilteredResults(filteredArray)
  }


  return (
    <main>
      <Container className='fixtures'>
        <Row>
          <Col xs="12">
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Results</h1>
          </Col>
          <Col xs="4">
            <Form.Label>Select Matchday</Form.Label>
            <Form.Select className='mb-4' onChange={(e) => filterMatchday(e.target.value)}>
              <option value='All'>All</option>
              {results.length && getMatchday()}
            </Form.Select>
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
                    <h4 className='mb-3'>Matchday {matchday}</h4>
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
                    <h4 className='mt-2'>{day}-{month}-{year}</h4>
                  </Col>
                )
              })
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
