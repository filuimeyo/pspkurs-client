import React from 'react'
import { Link } from 'react-router-dom'

export const SubjectCard = ({subject}) => {
  return (
    <div className='subject' >

      <Link to={"/teachers"} state={{ id: subject[0] }}>
        <div>
            <img src={subject[2] != null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+subject[2] : "https://via.placeholder.com/300"} 
            alt={subject[1]}></img>
        </div>
        <div>
            <span>{subject[1]}</span>
            <h3>Количество учителей: {subject[3]}</h3>
        </div>
      </Link>
           
    </div>
  )
}
