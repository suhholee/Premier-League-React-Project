import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Custom Components
import Spinner from './common/Spinner'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Import image
import logoHead from '../assets/logo-head.png'

const Results = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Results</h1>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Results