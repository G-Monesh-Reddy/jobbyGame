import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import JobCard from '../JobCard/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    checked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    checked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    checked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    checked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPage extends Component {
  state = {
    userData: [],
    search: '',
    isLoading: true,
    salary: '',
    jobs: [],
    jobTypesList: employmentTypesList,
    selectedList: [],
    isLoadingUser: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
    this.getUserDetails()
  }

  getJobDetails = async () => {
    const {search, selectedList, salary} = this.state
    const jobTypesParam = selectedList.join(',')
    const api = `https://apis.ccbp.in/jobs?employment_type=${jobTypesParam}&minimum_package=${salary}&search=${search}`
    console.log(api)
    const token = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, option)
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      id: each.id,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobs: updatedData, isLoading: false})
  }

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const api = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, option)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userData: updatedData,
        isLoadingUser: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleJobTypeChange = event => {
    const {jobTypesList, selectedList} = this.state
    const {value, checked} = event.target

    const updatedJobChange = jobTypesList.map(each => {
      if (each.employmentTypeId === value) {
        return {...each, checked: !each.checked}
      }
      return each
    })
    console.log(updatedJobChange)
    if (updatedJobChange.length > 0) {
      const arr = updatedJobChange.filter(each => each.checked === true)

      const UpdatedselectedList = arr.map(each => each.employmentTypeId)
      console.log('new', UpdatedselectedList)
      this.setState({selectedList: UpdatedselectedList}, this.getJobDetails)

      this.setState({jobTypesList: updatedJobChange}, this.getJobDetails)
    } else {
      this.setState({selectedList: []})
    }
  }

  handleSalaryChange = event => {
    this.setState({salary: event.target.value}, this.getJobDetails)
  }

  jobSearch = event => {
    this.setState({search: event.target.value})
  }

  searchJobsBut = () => {
    this.getJobDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We Cannot seem to find the page you are looking for </p>
      <button className="nav-button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {userData, search, jobs, isLoading, isLoadingUser} = this.state
    const {name, profileImageUrl, shortBio} = userData

    return (
      <div className="jobs-bg">
        <Header />
        <div className="jobs">
          <div className="jobs-bg1">
            {isLoadingUser ? (
              <div
                className="loader-container"
                data-testid="loader"
                className="loader"
              >
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <div className="profile-bg">
                <img alt="profile" src={profileImageUrl} />
                <h1>{name}</h1>
                <p>{shortBio}</p>
              </div>
            )}
            <div>
              <div className="filter-items">
                <div>
                  <h2 className="jobs-label">Type of Job</h2>
                  <form id="employmentTypesForm">
                    <ul>
                      {employmentTypesList.map(type => (
                        <li className="filer-li">
                          <div key={type.employmentTypeId}>
                            <input
                              type="checkbox"
                              id={type.employmentTypeId}
                              name="employmentType"
                              value={type.employmentTypeId}
                              onChange={this.handleJobTypeChange}
                            />
                            <label
                              htmlFor={type.employmentTypeId}
                              className="jobs-label"
                            >
                              {type.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>

                <div>
                  <h2 className="jobs-label">Salary Range</h2>
                  <form id="salaryRangesForm">
                    <ul>
                      {salaryRangesList.map(range => (
                        <li className="filer-li">
                          <div key={range.salaryRangeId}>
                            <input
                              type="radio"
                              id={range.salaryRangeId}
                              name="salaryRange"
                              value={range.salaryRangeId}
                              onChange={this.handleSalaryChange}
                            />
                            <label
                              htmlFor={range.salaryRangeId}
                              className="jobs-label"
                            >
                              {range.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="jobs-search-div">
              <input
                type="search"
                className="jobs-input"
                placeholder="Search"
                id="search"
                onChange={this.jobSearch}
                value={search}
              />
              <button
                className="jobs-search-but"
                type="button"
                data-testid="searchButton"
                onClick={this.searchJobsBut}
              >
                <IoIosSearch />
              </button>
            </div>
            {isLoading ? (
              <div
                className="loader-container"
                data-testid="loader"
                className="loader-container-jobs"
              >
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <div className="overflow-bg">
                {jobs.length === 0 ? (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      alt="no jobs"
                    />
                    <h1 className="color">No Jobs Found</h1>
                    <p className="color">
                      We could not find any jobs. Try other filters
                    </p>
                  </div>
                ) : (
                  <ul className="ul">
                    {jobs.map(each => (
                      <JobCard data={each} key={each.id} />
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
