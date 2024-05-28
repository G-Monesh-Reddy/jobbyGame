import {Link, withRouter} from 'react-router-dom'

import Header from '../Header/index'

import './index.css'

const Home = props => {
  const findJobsButton = () => {
    const {history} = props
    history.replace('/Jobs')
  }

  return (
    <div className="bg-home">
      <Header />
      <div className="home-div">
        <h1 className="home-h1">Find the Job That Fits Your Life</h1>
        <p className="home-p">
          Millions of people are searching for jobs,salary,information,company
          reviews.Find the job that fits your life abilities and potentials{' '}
        </p>
        <Link to="/Jobs">
          <button
            className="home-button"
            onClick={findJobsButton}
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
