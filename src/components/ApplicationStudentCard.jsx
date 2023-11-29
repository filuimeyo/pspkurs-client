import React from 'react'
import { SmallTeacherCard } from './SmallTeacherCard'
import DeleteIcon from "../deleteicon.svg"
import { Link } from 'react-router-dom'

export const ApplicationStudentCard = ({application}) => {
  return (
    <div className='studentapplication'>

      <h3>Заявка от: {application.applicationDate.slice(0,10)}</h3>


      
      <Link to={"/teachers"} state={{ id: application.subject.id }} style={{ textDecoration: 'none' }} >
        <div className='twoelement' >
          <div className='imagecontainer'>
              <img src={application.subject.filename != null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+application.subject.filename : "https://via.placeholder.com/300"} 
              alt={application.subject.name}
              />
          </div>
          <div>
              <p>{application.subject.name}</p>
          </div>           
        </div>
      </Link>

    
      {
        application.teacher != null &&
        (
          <div>
            <span>Выбранный преподаватель: </span>
            <Link to="/teacher"  state={{ id: application.teacher.id }} style={{textDecoration: 'none'}} >
              <span>{application.teacher.name}</span>
            </Link>
          </div>

        )
      }

      

      {
        application.purpose != null?
        (
          <div>
            <span>Цель: </span>
            <span>{application.purpose.purpose}</span>
          </div>
        ):(<></>)
      }


      {
        application.details != null?
        (
          <div>
            <span>Детали: </span> <span>{application.details}</span>
          </div>
        ):(<></>)
      }

      
      
    </div>
  )
}


/*
<div className='delete'>
        <button>
            <img 
                src= {DeleteIcon} 
                alt='delete'
                onClick={(e)=>{
                  alert(application.id)
                }}
            />
        </button>
      </div>   */