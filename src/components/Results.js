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

// Import image
import logoHead from '../assets/logo-head.png'

const Results = () => {

  // ! State
  const [ fixtures, setFixtures ] = useState([])
  const [ filteredMatches, setFilteredMatches ] = useState([])
  const [ currentSeasonFilter, setCurrentSeasonFilter ] = useState('2022')
  const [ currentMatchdayFilter, setCurrentMatchdayFilter ] = useState('')
  const [ error, setError ] = useState('')
  const [ requestSuccessful, setRequestSuccessful ] = useState(false)

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League fixtures
    const getFixtures = async () => {
      try {
        const { data: { matches } } = await authenticated.get('/competitions/2021/matches?season=2022&status=FINISHED')
        setFixtures(matches)
        setRequestSuccessful(true)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getFixtures()
  }, [])

  return (
    <main>
      <Container className='fixtures'>
        <Row>
          <Col xs="12">
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Results</h1>
          </Col>
          <div className='results-container'>
            {fixtures.length > 0 && requestSuccessful ? 
              fixtures.map(match => {
                const { id, homeTeam: { name: homeTeamName, crest: homeTeamCrest }, awayTeam: { name: awayTeamName, crest: awayTeamCrest }, utcDate, score: { fullTime: { home, away } }, matchday } = match
                // Cutting the utcDate in to just the start time of the game
                const time = utcDate.split('').slice(0, 10).join('')
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
                    <h4 className='mt-2'>{time}</h4>
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
