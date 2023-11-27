import React from 'react'
import { Link } from 'react-router-dom'

export const SmallTeacherCard = ({subject}) => {
  return (
    <Link to={"/teachers"} state={{ id: subject.id }} style={{ textDecoration: 'none' }} >
        <div className='teacherSubj' >
          <div>
              <img src={subject.filename != null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+subject.filename : "https://via.placeholder.com/300"} 
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
