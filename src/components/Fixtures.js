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

const Fixtures = () => {

  // ! Variables
  // Date variables are used to check the exact season that we are at currently (for example, 2022 is equal to the 2022-23 season)
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  // Current date needs to be passed in order to bring in the data for today's fixtures
  const currentDate = new Date().getDate()
  const fullDateString = `${currentYear}-0${currentMonth + 1}-${currentDate}`

  // ! State
  const [ fixtures, setFixtures ] = useState([])
  const [ error, setError ] = useState('')
  const [ requestSuccessful, setRequestSuccessful ] = useState(false)

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League table
    const getFixtures = async () => {
      try {
        if (currentMonth < 7) {
          const { data: { matches } } = await authenticated.get(`/competitions/2021/matches?season=${currentYear - 1}&dateTo=${fullDateString}&dateFrom=${fullDateString}`)
          setFixtures(matches)
          setRequestSuccessful(true)
        } else if (currentMonth >= 7) {
          const { data: { matches } } = await authenticated.get(`/competitions/2021/standings?season=${currentYear}&dateTo=${fullDateString}&dateFrom=${fullDateString}`)
          setFixtures(matches)
          setRequestSuccessful(true)
        }
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
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Fixtures</h1>
          </Col>
          <Col xs="12">
            <h2 className='mb-3 fw-bold'>
              {currentDate}/{currentMonth + 1}/{currentYear}
            </h2>
          </Col>
          {fixtures.length > 0 ? 
            fixtures.map(match => {
              const { id, homeTeam: { name: homeTeamName, crest: homeTeamCrest }, awayTeam: { name: awayTeamName, crest: awayTeamCrest } } = match
              return (
                <Col key={id} sm="12" className='match text-center'>
                  <h3><span>{homeTeamName} <img className='match-crest' src={homeTeamCrest} /></span> vs <span><img className='match-crest' src={awayTeamCrest} />{awayTeamName}</span></h3>
                </Col>
              )
            })
            :
            fixtures.length === 0 && requestSuccessful ?
              <h2>There are no matches today.</h2>
              :
              error ? 
                <Error error={error} /> 
                : 
                <Spinner />
          }
        </Row>
      </Container>
    </main>
  )
}

export default Fixtures
