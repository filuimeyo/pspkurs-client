import React from 'react'
import { SmallTeacherCard } from './SmallTeacherCard'
import DeleteIcon from "../deleteicon.svg"
import { Link } from 'react-router-dom'
import axios from 'axios';


const APPLY_API_URL = "http://localhost:8080/api/v1/teacher/subjectapplicationfeedback"

export const ApplicationSubjectCard = ({application}) => {

  let  studentInf = <></>;

  const handleOKClick = (e) => {
   
    const body = {
        subjectApplicationId : application.id,
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

        
        <div>
          <span>Студент: </span>
        
            <span>{application.student.name}</span>
          
        </div>


        <button className='subjectappll' onClick={(handleOKClick)}>Откликнуться</button>
      
      
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