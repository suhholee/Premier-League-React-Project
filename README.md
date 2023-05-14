# Project 2 - 2022-23 Premier League Website

## Overview
This is my second project whilst enrolling on General Assembly’s Software Engineering Immersive Course. The assignment was to create a React application that consumes a public API. I decided to create a Premier League information website, pulling data of the 2022-23 Premier League season, providing users information about today's fixtures, results, the league table, and player statistics.

## Requirements
- Consume a public API
- Have several components
- The app can have a router with several “pages”
- Include wireframes
- Be deployed online

## Timeframe
The timeframe given for this project was two days. I worked independently for this project.

## Technologies Used
- JavaScript
- HTML
- React
- SASS
- VS Code
- Insomnia
- Excalidraw
- JSX
- Axios
- React-Router-Dom
- Git
- GitHub
- Netlify
- Football Data API: http://api.football-data.org/v4/competitions/2021/

## Deployed Project Link
https://premier-league-react-project.netlify.app/ 

![Screen Grab of finished version](/src/assets/pl.gif)

## Plan
- To continue on with my love for football, I decided to consume an API that had the most up-to-date information about the Premier League.
- After searching in google, I found football-data.org, which had numerous public APIs that developers can use to create websites on their own. I chose the Premier League API to achieve what I planned as mentioned in the beginning.
- The link http://api.football-data.org/v4 has been set as the proxy inside package.json, which has allowed me to only complete the rest of the URL link within the get request.
- For my react project, I will decide to implement the ‘/competitions/2021/standings’ for the table page and `/competitions/2021/matches’.
  - API: http://api.football-data.org/v4/competitions/2021/
  - Token: a4c87b4146104266b12f4e3397c539cf

### Wireframe
![Excalidraw screenshot](/src/assets/premier-league-react-project-wireframe.png)

- As shown in the wireframe above, my plan was to start with the homepage that has a navigation bar, a title header, and the current standings of the Premier League table, which were the basic elements of a football information website.
- Then through routers, I planned to navigate to the fixtures page with the matches that are happen today, and to the results page, where the past results were present. All of these API links were created separately inside Insomnia.

![Excalidraw screenshot](/src/assets/insomnia.png)
- Finally, before I started coding, all of the necessary files including the App.js (controls all the routes), Navbar.js (the navigation bar included in all the pages), Home.js (home page), each of the pages’ JavaScript file (fixtures and results), and SCSS style sheets were created.

## Process
### Base Files
- To begin with, I have separated the JavaScript files into the main App.js, index.js, and five different components (Home.js, PageNavbar.js, Standings.js, Fixtures.js, and Results.js) to build a more efficient and clear way of reading code and making connections between each page within the website.
- In order to achieve this, the first step was to create App.js, which was used to bring in all the different components through the BrowserRouter, connecting them to different route paths within the website.

  ```js
  import { BrowserRouter, Routes, Route } from 'react-router-dom'

  // Components
  import PageNavbar from './components/common/PageNavbar'
  import PageNotFound from './components/common/PageNotFound'
  import Home from './components/Home'
  import CurrentTable from './components/CurrentTable'
  import Fixtures from './components/Fixtures'
  import Results from './components/Results'
  import Stats from './components/Stats'
  import Footer from './components/common/Footer'

  const App = () => {
  // Add slash in the beginning of the request ie) /v4/competitions
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        {/* <PageNavbar /> */}
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Results />} />
          <Route path="/table" element={<CurrentTable />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
  }

  export default App
  ```
- For styling, global SCSS files were created first. The base file had the basic format of the website and the variables had specific colour and flex variables that will be used throughout the webpage.
- React bootstrap, bootstrap, axios, and react-router-dom were used to arrange the elements within the webpage.

### PageNavbar
- I used react bootstrap to style and arrange the navbar elements as it is considered to be an efficient and functional tool to make the website more dynamic to the user. 
- I branded the Premier League logo using Navbar.Brand and linked it to the home page. Then, I used Navbar.Collapse to arrange the other navigation tabs, including fixtures and results.
- The navbar consisted of links to the Home, Fixtures, and Results page. The home page is the default ‘/’ page. Fixtures and results each had a ‘/fixtures’ and ‘/results’ at the end of the URL link.
- The navbar exists in every route of the website as set outside and above of PageNavBar Routes in App.js
- I have added a conditional using the react-bootstrap className styling to colour the bottom border when the current location path is the current page that the user is in.

  ```js
  return (
  <Navbar expand="md">
     <Container>
       <Navbar.Brand to="/" as={Link}><img src={logo} /></Navbar.Brand>
       <Navbar.Toggle aria-controls="premier-league-nav" className='navbar-dark' />
       <Navbar.Collapse id="premier-league-nav" className='justify-content-end'>
         <Nav>
           <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'square border-bottom border-white' : ''}>Home</Nav.Link>
           <Nav.Link to="/fixtures" as={Link} className={location.pathname === '/fixtures' ? 'square border-bottom border-white' : ''}>Fixtures</Nav.Link>
           <Nav.Link to="/results" as={Link} className={location.pathname === '/results' ? 'square border-bottom border-white' : ''}>Results</Nav.Link>
           <Nav.Link to="/table" as={Link} className={location.pathname === '/table' ? 'square border-bottom border-white' : ''}>Table</Nav.Link>
           <Nav.Link to="/stats" as={Link} className={location.pathname === '/stats' ? 'square border-bottom border-white' : ''}>Player Stats</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
   )
  ```

### PageNotFound
- A “Page Not Found” page was created in case the user might go to a URL path that is not set within the code. Therefore, this page linked the website here when the path of the URL is connected to a path that was not set within App.js.

  ```js
  const PageNotFound = () => {
    return (
      <main className="container text-center">
        <h1>404 Page Not Found</h1>
      </main>
    )
  }
  export default PageNotFound
  ```

### Authorization (Auth.js)
- Auth.js file was created because my API link needed a header with a token key provided from the website.
- Using the token mentioned above, I used axios.create to create an authenticated constant that was exported and imported in different API links that will be utilised in different components.

  ```js
  import axios from 'axios'

  const tokenName = 'a4c87b4146104266b12f4e3397c539cf'

  export const authenticated = axios.create({
  // baseURL: 'https://api.football-data.org/v4',
  headers: {
    'X-AUTH-TOKEN': tokenName,
  },
  })
  ```

### Home
- The home page was quite straightforward. I originally planned it to have the current Premier League table as the home page, but separated it into a different component. The final version has a header and react bootstrap buttons within a hero that are linked to each page. This was created separately from the navbar just because these buttons are able to explain more about the purpose and goal of each component.

  ```js
  import { Link } from 'react-router-dom'
  import Button from 'react-bootstrap/Button'

  // Import image
  import logoHead from '../assets/logo-head.png'

  const Home = () => {
    return (
      <main className='home'>
        <div className='hero'>
          <h1 className='display-4 text-center mt-3 mb-4 fw-bold'><img src={logoHead} />Welcome to the 2022/23 Premier League!</h1>
          <p className='lead display-6 mb-5'>Explore the website to see...</p>
          <Button to="/fixtures" as={Link} className='button display-6'>Today&#39;s Fixtures</Button>
          <Button to="/results" as={Link} className='button display-6'>Past Results</Button>
          <Button to="/table" as={Link} className='button display-6'>Current Premier League Table</Button>
          <Button to="/stats" as={Link} className='button display-6'>Top Scorers</Button>
        </div>
      </main>
    )
  }
  export default Home
  ```

### Current Table
- This page displays the current Premier League table. I have used react-bootstrap elements to create this page.
- A year and month variables were selected because although the season is set as a single year (i.e., 2022) in the API, the entire season spans across two years. Therefore, I have set a conditional to check the current month. As the season starts in August, the conditional was set as if the current month is less than 7 (August), subtract one from the current year and add it to the end of the API link. If not, add the current year to the end of the API link.

  ```js
  useEffect(() => {
   // This function will get the current Premier League table
   const getTable = async () => {
     try {
       // As the Premier League season starts in August to May of next year, checking the current month is necessary to pass through the current year, as the 2022-23 season's value is 2022.
       // If current month is before August, current year is subtracted by 1.
       // If the current month is after August, current year is remained the same.
       if (currentMonth < 7) {
         const { data: { standings } } = await authenticated.get(`/api/competitions/2021/standings?season=${currentYear - 1}`)
         const { table } = standings[0]
         setTable(table)
       } else if (currentMonth >= 7) {
         const { data: { standings } } = await authenticated.get(`/api/competitions/2021/standings?season=${currentYear}`)
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
  ```

- A react bootstrap table was used for the Premier League table. A conditional was also set here so that if there is an error with implementing the table, an error is displayed. Also, if there isn’t an error but the table array is empty, then it means that the data is loading. Therefore, I passed the spinner gif.

  ```js
  return (
   <main>
     <Container>
       <Row>
         <Col xs="12" className='flex-center'>
           <h1 className='display-5 text-center fw-bold'><img src={logoHead} />Premier League Table</h1>
           <p className='mb-4'>Refresh the page to update the table.</p>
         </Col>
         {/* Implementing a react bootstrap table */}
         {table.length > 0 ?
           <Table hover borderless size="sm">
             {/* Headers */}
             <thead>
               <tr className='text-center'>
                 <th>Position</th>
                 <th className='text-start'>Club</th>
                 <th>Played</th>
                 <th>Won</th>
                 <th>Draw</th>
                 <th>Lost</th>
                 <th>GD</th>
                 <th>Points</th>
                 <th>Form</th>
               </tr>
             </thead>
             {/* Body */}
             {table.map(rank => {
               const { position, team: { name, id, crest }, playedGames, won, draw, lost, goalDifference, points, form } = rank
               const newForm = form.split(',').join('  ')
               return (
                 <tbody key={id}>
                   <tr className='text-center'>
                     <td>{position}</td>
                     <td className='text-start'><img className='crest' src={crest}></img>{name}</td>
                     <td>{playedGames}</td>
                     <td>{won}</td>
                     <td>{draw}</td>
                     <td>{lost}</td>
                     <td>{goalDifference}</td>
                     <td>{points}</td>
                     <td>{newForm}</td>
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
  ```

### Fixtures
- The fixtures page targeted the fixtures of the current date. Therefore, the get request link had filters of season and the dateTo and dateFrom. The API links, however, varied as the .getMonth format did not have a 0 in front of single digit numbers and the link required a YYYY/MM/DD format within the dateTo and dateFrom filters. Therefore, within the if (currentMonth >= 7) conditional, I added another conditional to check whether the month was a single or double digit number, in order to pass in different filters to the fullDateString variable.
- Then the elements were destructured to be implemented within the react bootstrap columns.
- An additional conditional was needed to be brought in because there might be a case where there are no matches on that date. Therefore, I checked whether the request was successful or not (using a boolean) by setting an useState within each get request. If the requestSuccessful is true, but the fixtures array is empty, then I displayed “There are no matches today”. The other conditional was equal to that of the table component.

  ```js
  useEffect(() => {
   const getFixtures = async () => {
     try {
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
  ```

### Results
- For the results API, unlike the fixtures, I have passed a status filter of finished within the API link in order to just get the finished games. I have also set the flex-direction as column reverse to get the most recent results to the top.

  ```js
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
  ```

- Most of the format was similar to the fixtures component. In addition, I added a filter that filters the results by team/club because it would be useful for the users to search the results/teams they specifically want to target. The style was used with Form.Select in react-bootstrap.
- I originally wanted to add a select matchday element at the top, but due to wrong matchday values within the API, I decided to change this into a team selector.

  ```js
  return (
    <main>
      <Container className='fixtures'>
        <Row>
          <Col xs="12" className='flex-center'>
            <h1 className='display-5 text-center mb-3 fw-bold'><img src={logoHead} />Results</h1>
            <p className='mb-3'>Refresh the page to update the results.</p>
          </Col>
          <Col xs="6">
            <Form.Group className="mb-3" controlId="formSelectTeams">
              <Form.Label>Filter by Club</Form.Label>
                <Form.Select className='mb-4' onChange={(e) => filterTeams(e.target.value)}>
                  <option value='All'>All</option>
                  {results.length && getTeams()}
                </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="6">
            <Form.Group className="search mb-3" controlId="formSearchGames">
              <Form.Label>Search Results by Club Name</Form.Label>
                <div className='search-bar'>
                  <Form.Control type="text" placeholder="Search..." onChange={(e) => searchResults(e.target.value)}/>
                </div>
            </Form.Group>
          </Col>

          ...code continued

        </Row>
      </Container>
    </main>
  )
  ```

### Player Statistics
- The player statistics page was created in a similar format with the Table page, using the react bootstrap table element.
- I received the request from the API link ‘/competitions/2021/scorers’.
- The month conditional was irrelevant in this page because I did not need to pass the year within the API link.

## Challenges & Bugs
### Challenges
#### Figuring out the Conditionals for each API Link
- As mentioned above, the API link that I used had various filters. Therefore, I needed to check every possible detail that might alter the link. For example, in the Fixtures components, the current date format needed to be changed into YYYY/MM/DD to pass the correct data. After a few trials, I was able to figure out these minor troubles that were caused by these get request errors.
- It was difficult to find these errors unless I test the numerous possibilities. Next time for a project that has a longer timespan, I would like to write out all the possible errors and test them out to add later in my code to debug.

#### No matches today
- Within the fixtures component, it is possible that the matches array that we got from the public API was empty, which meant that there were no matches on that day. Therefore, in order to present the correct information on display, I found out that another conditional before the error handling and loading display was necessary as both displays meant that the fixtures array was empty. This conditional was that if the fixtures length was zero (empty array) but the request was successful, display text that said “No Matches Today”.
- This error also needs careful consideration of all the possibilities. Therefore, I devise the same solution of writing all of the possible errors with each component as mentioned above.

#### Search Results
- I have added a search bar that filters the searched club’s results, both home and away. Setting conditionals for the filter was tricky, but eventually got it to work.

  ```js
  // ! Search Results
  const searchResults = (value) => {
    setSearch(value)
    const regex = new RegExp(search, 'i')
    const filteredArray = results.filter(result =>
      (regex.test(result.homeTeam.name) || regex.test(result.awayTeam.name)) &&
      (result.homeTeam.name === currentTeamFilter || result.awayTeam.name === currentTeamFilter || currentTeamFilter === 'All'))
    setFilteredResults(filteredArray)
  }
  ```

- This search bar was implemented to mainly use the filter first to find one of the clubs and easily search for the match by typing its opponent.

### Bugs
- Bugs occur in the different pages sometimes because the API get request is limited to a certain amount per day.

## Wins and Takeaways
### Wins
- I was able to not only utilise the react bootstrap components learned in class, but also searched and implemented extra react bootstrap components including Tables and Forms.
- I now feel comfortable with destructuring the elements received from the API and utilising it in parts that I need.
- Time management was very important in this project. As the time span given was only two days, I needed to plan in the right way to accomplish the points that I set as goals in the beginning. Compared to [Project 1](https://github.com/suhholee/Space-Invaders), I feel much more comfortable in creating a wireframe that serves as a fundamental role in my code building process.

### Takeaways
- I learned how to efficiently implement react, react-bootstrap, react-router-dom, and SASS to write efficient and readable code to create a dynamic app for the users. 
- These new tools enabled me to create an app in a more compact and responsive way.
- Creating JavaScript components that connect to each other in App.js using BrowserRouter allowed me to separate the different parts of the application and fix the specific sections that are only necessary without scrolling down to find them.
- Using base and variable components within SASS made it much easier to build a style basis and alter sections in regards to these components.
- I feel comfortable with using class styling elements within the JavaScript file. Also, this allowed me to easily make displays responsive.

## Future Improvements
- One of my goals was to retrieve the past results of previous seasons, however, the API had limitations to requesting for data.
- I wanted to filter the results by matchday, but some of the matchday data in the API were wrong (ex. Crystal Palace vs Manchester United wasn’t matchday 7). Therefore, I removed the matchday filter and rather filtered the games with team names.
- I would like to make my application live when there are matches taking place. With unlimited get requests, this would be possible in the future.
- I would like to be able to add more features to the filter and search bar in the results section. One idea that I have is to allow the search bar to search the specific game by typing the names of both home and away teams, or the total score.
- I would like to make the timezone responsive to anywhere in the world.

