import React from 'react'
import { Link } from 'react-router-dom'

export const SubjectCard = ({subject}) => {
  return (
    <div className='subject' >

      <Link to={"/teachers"} state={{ id: subject[0].id }}>
        <div>
            <img src={subject[0].fileName != null ? "http://localhost:8080/api/v1/registration/subject/image/"+subject[0].fileName : "https://via.placeholder.com/300"} 
            alt={subject[0].name}></img>
        </div>
        <div>
            <span>{subject[0].name}</span>
            <h3>Количество учителей: {subject[1]}</h3>
        </div>
      </Link>
           
    </div>
  )
}
