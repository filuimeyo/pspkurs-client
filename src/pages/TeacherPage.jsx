import React from 'react'
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import Star from "../star.svg"

import { TeacherSubjectCard } from '../components/TeacherSubjectCard';
import {CommentCard} from '../components/CommentCard';
import { TeacherCertificatesBlock } from '../components/TeacherCertificatesBlock';


const API_URL = 'http://localhost:8080/api/v1/public/info/teachers/one/'


export const TeacherPage = () => {

  const location = useLocation()
  const { id } = location.state || 1
  console.log(id)

  const [expanded, setExpanded] = useState(false);

  const [teacher, setTeachers] = useState([]);
 

  const searcTeachers = async () => {  
       const responce = await fetch(
           `${API_URL}${id}`,{});
  
       const data = await responce.json();
  
       setTeachers(data);  

      //Promise.all([
      //  fetch(`${API_URL}${id}`,{}),
      //  fetch(`${RATING_API_URL}${id}`,{}),
      //  fetch(`${COMMENTS_API_URL}${id}`,{}),
      //])
      //  .then(([resTeacher, resRating, resComments]) => 
      //    Promise.all([resTeacher.json(), resRating.json(), resComments.json()])
      //  )
      //  .then(([dataTeacher, dataRating, dataComments]) => {
      //    setTeachers(dataTeacher);  
      //    setFinalRating(dataRating)
      //    setComments(dataComments)
      //  })
  }

  useEffect(()=>{  
    searcTeachers() 
  }, [])

  

  let rating;
  if(teacher.finalRating !== 0.0 && teacher.finalRating){
    rating = 
        <div className='teacherPageRating'>
          {teacher.finalRating.toFixed(2)}
          <img
            src={Star}
            alt='stars'
          ></img>
        </div>
  }

  let purposes;
  if(teacher.purposes != null && teacher.purposes.length >0){
    purposes = 
    <>
      <h4>Специализация:</h4>
      <ul>
        {
          teacher.purposes.map( purpose =>(
            <li key={purpose.id}>{purpose.purpose}</li>
          ))
        }
        
      </ul>
    </>
  }

  let info;
  if(teacher.info!=null){
    info = 
    < >
      <div className='teacherinfo'>
        {

          <p className={expanded?'expanded':'notexpanded'}>{teacher.info}</p> 
          
        }
        <button
          onClick={(e)=>{
            setExpanded(!expanded)

         }}
        >
          
          {expanded?  ('\u25B2') :  ('\u25BC') } 
        </button>
    </div>
    </>
  }

  let certificates;
  if(teacher.certificates != null && teacher.certificates.length > 0){
    
    certificates = 
    <div style={{width: '100%', padding: '1rem'}}>
      <h4 style={{marginBottom: '1rem'}} >Сертификаты и дипломы:</h4>
      <div style={{width: '100%', display: 'flex'}}>
        {
            teacher.certificates.map(certificate =>(
              <TeacherCertificatesBlock  key={certificate.id} certificate={certificate}/>
            ))
            
          }

      </div>
    
    </div>
  }

  let getComments;
  if(teacher.teacherRating != null && teacher.teacherRating.length > 0){
    getComments = 
    <div className='commentdiv'>
      <h4 style={{marginLeft:'1rem', marginBottom : '0.5rem'}}>Отзывы:</h4>
      {
        teacher.teacherRating.map(comment =>(
          <CommentCard key={comment.id} comment={comment}/>  
        ))
      }
    </div>
  }

  return (
    <div className='singleteachercontainer'>

      <div>
        {            
            teacher.teacherSubjects?.length > 0
            ? (
                <div>
                    <TeacherSubjectCard subjects={teacher.teacherSubjects} lessonPrice={teacher.lessonPrice} id={teacher.id}/>
            
                </div>
            ):
            (
                <div className="empty">
                </div>
            ) 
        }
      </div> 
   
      <div className="container"> 

        <div className='teacherpicandname' >

          <div className='tearpagepic'>
            <img
              src={teacher.filename != null ? "http://localhost:8080/api/v1/public/info/teachers/pic/"+teacher.filename : "https://via.placeholder.com/300"}
              alt='teacher '
            ></img>
          </div>

          <div style={{marginLeft:'1rem'}}>
            <h3>{teacher.name}</h3>
            {rating}
            {purposes}
          </div>

        </div>

        {info}

        {certificates}

      
        {getComments}

      </div>


       

      
    
    </div>
  
  )
}


