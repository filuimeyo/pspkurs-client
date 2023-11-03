import React from 'react'
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import Star from "../star.svg"
import { Link } from 'react-router-dom'

import { TeacherSubjectCard } from '../components/TeacherSubjectCard';
import {CommentCard} from '../components/CommentCard';


const API_URL = 'http://localhost:8080/api/v1/registration/teacher/one/'

const RATING_API_URL = 'http://localhost:8080/api/v1/registration/teacher/finalrating/'

const COMMENTS_API_URL = 'http://localhost:8080/api/v1/registration/teacher/comments/'

export const TeacherPage = () => {

  const location = useLocation()
  const { id } = location.state

  const [expanded, setExpanded] = useState(false);

  const [teacher, setTeachers] = useState([]);
  const [finalRating, setFinalRating] = useState();
  const [comments, setComments] = useState([]);
  
  

  const searcTeachers = async (title) => {  
      // const responce = await fetch(
      //     `${API_URL}${id}`,{});
      
      // const data = await responce.json();
      
      // setTeachers(data);  

      Promise.all([
        fetch(`${API_URL}${id}`,{}),
        fetch(`${RATING_API_URL}${id}`,{}),
        fetch(`${COMMENTS_API_URL}${id}`,{}),
      ])
        .then(([resTeacher, resRating, resComments]) => 
          Promise.all([resTeacher.json(), resRating.json(), resComments.json()])
        )
        .then(([dataTeacher, dataRating, dataComments]) => {
          setTeachers(dataTeacher);  
          setFinalRating(dataRating)
          setComments(dataComments)
        })
  }

  useEffect(()=>{  
    searcTeachers('') 

  }, [])

  

  let rating;
  if(finalRating != 0.0 && finalRating){
    rating = 
        <div>
          {finalRating.toFixed(2)}
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

  let getComments;
  if(comments != null){
    getComments = 
    <div>
      {
        comments.map(comment =>(
          <CommentCard key={comment[0].id} comment={comment}/>  
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
                    <TeacherSubjectCard subjects={teacher.teacherSubjects} id={teacher.id}/>
            
                </div>
            ):
            (
                <div className="empty">
                </div>
            ) 
        }
      </div> 
   
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

      
        {getComments}

      </div>


       

      
    
    </div>
  
  )
}


