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
import Table from 'react-bootstrap/Table'

// Import image
import logoHead from '../assets/logo-head.png'

const Stats = () => {
  let rank = 0

  // ! State
  const [ stats, setStats ] = useState([])
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League table
    const getStats = async () => {
      try {
        const { data: { scorers } } = await authenticated.get('http://api.football-data.org/v4/competitions/2021/scorers')
        setStats(scorers)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getStats()
  }, [])

  return (
    <main>
      <Container>
        <Row>
          <Col xs="12" className='flex-center'>
            <h1 className='display-5 text-center fw-bold'><img src={logoHead} />Player Statistics</h1>
            <p className='mb-4'>Refresh the page to update the player statistics.</p>
          </Col>
          {/* Implementing a react bootstrap table */}
          {stats.length > 0 ?
            <Table hover borderless size="md">
              {/* Headers */}
              <thead>
                <tr className='text-center'>
                  <th>Rank</th>
                  <th className='text-start'>Name</th>
                  <th className='text-start'>Club</th>
                  <th>Goals</th>
                  <th>Assists</th>
                </tr>
              </thead>
              {/* Body */}
              {stats.map(player => {
                const { player: { id, name: playerName }, team: { crest, name: teamName }, goals, assists, penalties } = player
                rank = rank + 1
                return (
                  <tbody key={id}>
                    <tr className='text-center'>
                      <td>{rank}</td>
                      <td className='text-start'>{playerName}</td>
                      <td className='text-start'><img className='crest' src={crest}></img>{teamName}</td>
                      <td>{goals} &#40;Penalties: {penalties === null ? '0' : penalties}&#41;</td>
                      <td>{assists}</td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
            :
            // If there is an error, we print out the error on display. Else, the data is still loading, so the spinner is displayed.
            <>
              { error ? 
                <Error error={error} /> 
                : 
                <Spinner />
              }
            </>
          }
        </Row>
      </Container>
    </main>
  )
}

export default Stats