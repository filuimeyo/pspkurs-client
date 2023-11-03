import React from 'react'
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import Star from "../star.svg"
import { Link } from 'react-router-dom'
import { SmallTeacherCard } from '../components/SmallTeacherCard';


const API_URL = 'http://localhost:8080/api/v1/registration/teacher/one/'

export const TeacherPage = () => {

  const location = useLocation()
  const { id } = location.state

  const [expanded, setExpanded] = useState(false);

  const [teacher, setTeachers] = useState([]);
  const [searchTerm, setSeachTerm] = useState('');

    const searcTeachers = async (title) => {  
        const responce = await fetch(
            `${API_URL}${id}`,{});
        
        const data = await responce.json();
        
        setTeachers(data);  
    }
  
       useEffect(()=>{  
            searcTeachers('') 
        }, [])


  let rating;
  if(teacher.finalRating != 0.0 && teacher.finalRating){
    rating = 
        <div>
          {teacher.finalRating.toFixed(2)}
          <img
            src={Star}
            alt='stars'
          ></img>
        </div>
  }

  let info;
  if(teacher.info!=null){
    info = 
    <div className='teacherinfo'>
        {

          <p className={expanded?'expanded':'notexpanded'}>{teacher.info}</p> 
          
        }
        <button
          onClick={(e)=>{
            setExpanded(!expanded)

         }}
        >
          {expanded? "-":"+"}
        </button>
      </div>
  }

  let certificates;
  if(teacher.certificates != null ){
    
    certificates = 
    <div>
        {
          teacher.certificates.map(certificate =>(
            <img 
              key={certificate.id}
              src={certificate.fileName != null ? " http://localhost:8080/api/v1/registration/teacher/imageofdocs/"+certificate.fileName : "https://via.placeholder.com/300"}
              alt='certificate '
            ></img>
          ))
        }
    </div>
  }

  return (
    <div className="container">

      <div className='tearpagepic'>
        <img
          src={teacher.fileName != null ? "http://localhost:8080/api/v1/registration/teacher/profileimage/file/"+teacher.fileName : "https://via.placeholder.com/300"}
          alt='teacher '
        ></img>
      </div>

      <div>
        <h3>{teacher.firstName}</h3>
      </div>

      {rating}

      {info}

      {certificates}

      <div>

        {            
            teacher.teacherSubjects?.length > 0
            ? (
                <div>
              
                  {
                     teacher.teacherSubjects.map(subject =>(
                      <SmallTeacherCard key={subject.id} subject={subject}/>
                    ))  
                  }
                </div>
            ):
            (
                <div className="empty">
                </div>
            ) 
        }

    
      </div>
    </div>

    
  )
}
