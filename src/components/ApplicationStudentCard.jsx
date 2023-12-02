import React from 'react'
import { SmallTeacherCard } from './SmallTeacherCard'
import DeleteIcon from "../deleteicon.svg"
import { Link } from 'react-router-dom'
import axios from 'axios';


const APPLY_API_URL = "http://localhost:8080/api/v1/teacher/teacherapplicationfeedback"

export const ApplicationStudentCard = ({application, student, role}) => {

  let teacherInf = <></>, studentInf = <></>;

  let buttons;


  const handleOKClick = (e) => {
   
    const body = {
      applicationId : application.id,
      type : "OK"
    }
  
    const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
		};

    console.log(body)
    
        axios.post( APPLY_API_URL, body, {headers})
        .then(res => {
          console.log(res.data)
          alert(res.data);
          
        })
        .catch(res => alert("Вы уже откликались на эту заявку") )
  }


  const handleRefusedClick = (e) => {
    const body = {
      applicationId : application.id,
      type : "REFUSED"
    }
  
    const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
		};
    
        axios.post( APPLY_API_URL, body, {headers})
        .then(res => {
          console.log(res.data)
          alert(res.data)
         
        })
        .catch(res => alert("Вы уже откликались на эту заявку") )
  }

  switch(role){
    case "STUDENT" : {
      teacherInf =  
        application.teacher != null &&
        (
          <div>
            <span>Выбранный преподаватель: </span>
            <Link to="/teacher"  state={{ id: application.teacher.id }} style={{textDecoration: 'none'}} >
              <span>{application.teacher.name}</span>
            </Link>
          </div>

        )
        break;

    }
    case "TEACHER" : {
      studentInf = 
        student != null &&
        <div>
          <span>Студент: </span>
        
            <span>{student.name}</span>
          
        </div>

        buttons = 
        <>
          <button className='subjectappll' onClick={(handleRefusedClick)}>Отказаться</button>
          <button className='subjectappll' onClick={(handleOKClick)}>Откликнуться</button>
        </>
        break;
    
    }
    case "ADMIN" : {
      teacherInf =  
        application.teacher != null &&
        (
          <div>
            <span>Выбранный преподаватель: </span>
            <Link to="/teacher"  state={{ id: application.teacher.id }} style={{textDecoration: 'none'}} >
              <span>{application.teacher.name}</span>
            </Link>
          </div>

        )

        studentInf = 
        student != null &&
        <div>
          <span>Студент: </span>
        
            <span>{student.name}</span>
          
        </div>
        break;
    }
  }

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

    
      {teacherInf}

      

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

      {studentInf}
      
      {buttons}
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