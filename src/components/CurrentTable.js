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

const CurrentTable = () => {

  // ! Variables
  // Date variables are used to check the exact season that we are at currently (for example, 2022 is equal to the 2022-23 season)
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  // ! State
  const [ table, setTable ] = useState([])
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    // This function will get the current Premier League table
    const getTable = async () => {
      try {
        // As the Premier League season starts in August to May of next year, checking the current month is necessary to pass through the current year, as the 2022-23 season's value is 2022.
        // If current month is before August, current year is subtracted by 1.
        // If the current month is after August, current year is remained the same.
        if (currentMonth < 7) {
          const { data: { standings } } = await authenticated.get(`/competitions/2021/standings?season=${currentYear - 1}`)
          const { table } = standings[0]
          setTable(table)
        } else if (currentMonth >= 7) {
          const { data: { standings } } = await authenticated.get(`/competitions/2021/standings?season=${currentYear}`)
          const { table } = standings[0]
          setTable(table)
        }
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getTable()
  }, [])

  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 className='display-5 text-center mb-4 fw-bold'><img src={logoHead} />Premier League Table</h1>
          </Col>
          {/* Implementing a react bootstrap table */}
          {table.length > 0 ?
            <Table borderless size="sm">
              {/* Headers */}
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Club</th>
                  <th className='text-center'>Played</th>
                  <th className='text-center'>Won</th>
                  <th className='text-center'>Draw</th>
                  <th className='text-center'>Lost</th>
                  <th className='text-center'>GD</th>
                  <th className='text-center'>Points</th>
                  <th className='text-center'>Form</th>
                </tr>
              </thead>
              {/* Body */}
              {table.map(rank => {
                const { position, team: { name, id, crest }, playedGames, won, draw, lost, goalDifference, points, form } = rank
                const newForm = form.split(',').join('  ')
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{position}</td>
                      <td><img className='crest' src={crest}></img>{name}</td>
                      <td className='text-center'>{playedGames}</td>
                      <td className='text-center'>{won}</td>
                      <td className='text-center'>{draw}</td>
                      <td className='text-center'>{lost}</td>
                      <td className='text-center'>{goalDifference}</td>
                      <td className='text-center'>{points}</td>
                      <td className='text-center'>{newForm}</td>
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

export default CurrentTable