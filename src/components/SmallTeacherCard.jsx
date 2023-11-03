import React from 'react'
import { Link } from 'react-router-dom'

export const SmallTeacherCard = ({subject}) => {
  return (
    <Link to={"/teachers"} state={{ id: subject.id }} style={{ textDecoration: 'none' }} >
        <div className='teacherSubj' >
          <div>
              <img src={subject.fileName != null ? "http://localhost:8080/api/v1/registration/subject/image/"+subject.fileName : "https://via.placeholder.com/300"} 
              alt={subject.name}
              />
          </div>
          <div>
              <p>{subject.name}</p>
          </div>           
        </div>
    </Link>
  )
}
