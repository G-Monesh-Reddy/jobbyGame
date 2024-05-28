import {IoIosStar} from 'react-icons/io'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {data} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    packagePerAnnum,
  } = data
  return (
    <Link to={`/jobs/${id}`} className="class-link">
      <li className="li">
        <div className="icon-bg">
          <div>
            <img src={companyLogoUrl} alt="company logo" className="icon" />
          </div>
          <div>
            <h1 className="card-title color">{title}</h1>
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
          <h1 className="card-title color">Description</h1>
          <p className="desr-p">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
