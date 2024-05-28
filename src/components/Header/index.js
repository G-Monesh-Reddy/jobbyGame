import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const logOutButton = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <nav className="nav-bg">
        <div>
          <Link to="/" className="class-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </div>
        <div>
          <ul className="ulH">
            <Link to="/" className="class-link">
              <li className="liH">Home</li>
            </Link>
            <Link to="/Jobs" className="class-link">
              <li className="liH">Jobs</li>
            </Link>
          </ul>
        </div>
        <div>
          <button className="nav-button" onClick={logOutButton} type="button">
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
