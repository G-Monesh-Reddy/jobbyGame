import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'

import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsArrowUpRight} from 'react-icons/bs'
import Header from '../Header/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    skillDetails: [],
    lifeAtCompDetails: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }
  onClickRetry = () => {
    this.renderJobDetails()
  }
  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const api = `https://apis.ccbp.in/jobs/${id}`
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
      console.log(data)
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
      }
      const updatedSkillsData = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const updatedLifeAtCompanyData = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSimilarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedJobDetails)
      this.setState({
        jobDetails: updatedJobDetails,
        skillDetails: updatedSkillsData,
        lifeAtCompDetails: updatedLifeAtCompanyData,
        similarJobs: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, skillDetails, lifeAtCompDetails, similarJobs} =
      this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompDetails

    return (
      <>
        <div className="job-item-detail-inner-bg ">
          <div className="icon-bg">
            <div>
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="icon"
              />
            </div>
            <div>
              <h1 className="color">{title}</h1>
              <p className="color">
                <IoIosStar className="icon-star" /> {rating}
              </p>
            </div>
          </div>
          <div className="loc-type-pack">
            <div className="loc-type">
              <p className="job-p">
                <IoLocationSharp className="color" /> {location}
              </p>
              <p className="color">
                <BsFillBriefcaseFill className="color" /> {employmentType}
              </p>
            </div>
            <div>
              <p className="color">{packagePerAnnum} </p>
            </div>
          </div>
          <hr />
          <div>
            <div className="loc-type-pack">
              <h1 className="color">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                className="class-link"
                rel="noreferrer"
              >
                Visit
              </a>
            </div>
            <p className="desr-p">{jobDescription}</p>
          </div>
          <div>
            <h1 className="color">Skills</h1>
            <ul className="skills-ul">
              {skillDetails.map(each => (
                <li key={each.name} className="skills-li">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skills-image"
                  />
                  <p className="color">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="color">Life At Company </h1>
            <div className="life-at-com">
              <div className="mobile-view">
                <img src={imageUrl} alt="life at company" />
              </div>
              <div>
                <p className="color">{description}</p>
              </div>
              <div className="desktop-view">
                <img src={imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="color">Similar Jobs </h1>
          <div>
            <ul className="similar-jobs-ul">
              {similarJobs.map(each => (
                <li className="similar-job-li" key={each.id}>
                  <div className="icon-bg">
                    <div>
                      <img
                        src={each.companyLogoUrl}
                        alt="similar job company logo"
                        className="icon"
                      />
                    </div>
                    <div>
                      <h1 className="similar-title color">{each.title}</h1>
                      <p className="color">
                        <IoIosStar className="icon-star" /> {each.rating}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className=" similar-title color">Description</h1>
                    <p className="desr-p">{each.jobDescription}</p>
                  </div>
                  <div className="loc-type-pack">
                    <div className="loc-type">
                      <p className="job-p">
                        <IoLocationSharp className="color" /> {each.location}
                      </p>
                      <p className="color">
                        <BsFillBriefcaseFill className="color" />{' '}
                        {each.employmentType}
                      </p>
                    </div>
                    <div>
                      <p className="color">{each.packagePerAnnum} </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
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
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="job-item-detail-bg ">
            <Header />
            {this.renderJobDetails()}
          </div>
        )
      case apiStatusConstants.inProgress:
        return (
          <div className="job-item-detail-bg ">
            <Header />
            {this.renderLoadingView()}
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="job-item-detail-bg ">
            <Header />
            {this.renderFailureView()}
          </div>
        )
      default:
        return null
    }
  }
}

export default JobItemDetails
