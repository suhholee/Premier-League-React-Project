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
  // Full date string is used inside the API link. 0 in front of the month isn't added for October, November, and December
  let fullDateString

  // ! State
  const [ fixtures, setFixtures ] = useState([])
  const [ error, setError ] = useState('')
  const [ requestSuccessful, setRequestSuccessful ] = useState(false)

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League fixtures
    const getFixtures = async () => {
      try {
        // As the Premier League season starts in August to May of next year, checking the current month is necessary to pass through the current year, as the 2022-23 season's value is 2022.
        // If current month is before August, current year is subtracted by 1.
        // If the current month is after August, current year is remained the same.
        // The fullDateString needs to be passed differently for months below 9 because the API link requires a YYYY/MM/DD format
        if (currentMonth < 7) {
          fullDateString = `${currentYear}-0${currentMonth + 1}-${currentDate}`
          const { data: { matches } } = await authenticated.get(`/api/competitions/2021/matches?season=${currentYear - 1}&dateTo=${fullDateString}&dateFrom=${fullDateString}`)
          setFixtures(matches)
          console.log(matches)
        } else if (currentMonth >= 7) {
          if (currentMonth >= 9) {
            fullDateString = `${currentYear}-${currentMonth + 1}-${currentDate}`
            const { data: { matches } } = await authenticated.get(`/api/competitions/2021/matches?season=${currentYear}&dateTo=${fullDateString}&dateFrom=${fullDateString}`)
            setFixtures(matches)
          } else {
            fullDateString = `${currentYear}-0${currentMonth + 1}-${currentDate}`
            const { data: { matches } } = await authenticated.get(`/api/competitions/2021/matches?season=${currentYear}&dateTo=${fullDateString}&dateFrom=${fullDateString}`)
            setFixtures(matches)
          }
        }
        setRequestSuccessful(true)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getFixtures()
  }, [])
  
  console.log(fixtures.length)

  return (
    <main>
      <Container className='fixtures'>
        <Row>
          <Col xs="12" className='flex-center'>
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Today&#39;s Fixtures</h1>
            <p className='mb-4'>Refresh the page to update the fixtures.</p>
            <h2 className='mb-4 fw-bold'>
              {currentDate}/{currentMonth + 1}/{currentYear}
            </h2>
          </Col>
          {fixtures.length > 0 && requestSuccessful ? 
            fixtures.map(match => {
              const { id, homeTeam: { name: homeTeamName, crest: homeTeamCrest }, awayTeam: { name: awayTeamName, crest: awayTeamCrest }, utcDate, score: { fullTime: { home, away } } } = match
              // Cutting the utcDate in to just the start time of the game
              const time = utcDate.split('').slice(11, 16).join('')
              return (
                <Col key={id} xs="12" className='match text-center'>
                  <h3>
                    <span className='home-team'>
                      {homeTeamName} 
                      <img className='match-crest' src={homeTeamCrest} />
                      {home === null ? '' : home}
                    </span>
                    vs 
                    <span className='away-team'>
                      {away === null ? '' : away}
                      <img className='match-crest' src={awayTeamCrest} />
                      {awayTeamName}
                    </span>
                  </h3>
                  <h4 className='mt-4'>Kick Off &#40;GMT&#41;: {time}</h4>
                </Col>
              )
            })
            :
            // If the request was successful but the fixtures array is empty, it means that there are no matches today.
            fixtures.length === 0 && requestSuccessful ?
              <h2 className='text-center'>There are no matches today.</h2>
              :
              // If there is an error, we print out the error on display. Else, the data is still loading, so the spinner is displayed.
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
