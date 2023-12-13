import React from 'react'
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import Star from "../star.svg"
import { UserContext } from '../App';
import { Chart } from 'react-google-charts';


import OutlinedStar from "../outlinedstar.svg"

import { TeacherSubjectCard } from '../components/TeacherSubjectCard';
import {CommentCard} from '../components/CommentCard';
import { TeacherCertificatesBlock } from '../components/TeacherCertificatesBlock';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/public/info/teachers/one/'

const ADD_COMMENT_API_URL = 'http://localhost:8080/api/v1/student/rating'


export const TeacherPage = () => {

  const { user, setUser } = React.useContext( UserContext);


  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(0)

  const location = useLocation()
  const { id } = location.state || 1
  console.log(id)

  const [expanded, setExpanded] = useState(false);

  const [teacher, setTeachers] = useState([]);


  const [map, setMap] = useState(null);

    let chartData;
    let chartOptions;
  
 

  const searcTeachers = async () => {  
       const responce = await fetch(
           `${API_URL}${id}`,{});
  
       const data = await responce.json();
        console.log(data);

        const ratingCountMap = new Map();

        for (let i = 1; i <= 10; i++) {
          ratingCountMap.set(i, 0);
        }
        
        data.teacherRating.forEach((obj) => {
          const rating = obj.rating;
        
          // Увеличьте значение для соответствующего ключа рейтинга на 1
          ratingCountMap.set(rating, ratingCountMap.get(rating) + 1);
        });
      

        chartData = [ ['Оценка', 'Количество']]
        ratingCountMap.forEach((  value, key) => {
          chartData.push([key.toString() , value]);
        });
        console.log(chartData)
        setMap(chartData)

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

  const handleAddComment = (e) =>{
    const body = {}
    body.teacherId = teacher.id
    body.rating = newRating
    body.comment = newComment

    const token =  localStorage.getItem("token");
    axios.put( ADD_COMMENT_API_URL, body, {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'}
    })
      .then(res => {
        alert(res.data)
        searcTeachers()
        
      })
      .catch(res => alert(res))
  }

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
        user &&

        <div className='comment'>
          <div>
              
              <div style={{display: "flex"}}>
                  {[...Array(newRating)].map((x, i) =>
                      <img
                          onClick={(e)=>setNewRating(i+1)}
                          src={Star}
                          alt='stars'
                          style={{ height: '30px'}}
                          key={i}
                      ></img>
                  )}
                  {[...Array(10-newRating)].map((x, i) =>
                      <img
                          onClick={(e)=>{setNewRating(newRating+i+1)}}
                          src={OutlinedStar}
                          alt='outstars'
                          key={i}
                          style={{ height: '30px'}}
                      ></img>
                  )}
              </div>


              <div style={{width: "100%"}}>
                <textarea cols={50} className='addcommtext' placeholder="добавьте комментарий"  onChange={(e)=>setNewComment(e.target.value)} value={newComment}/>
                <button className='addcomm' onClick={handleAddComment}>добавить</button>
              </div>

             
          </div>

        </div>

      }
      {
        teacher.teacherRating.map(comment =>(
          <CommentCard key={comment.id} comment={comment}/>  
        ))
      }
    </div>
  }

  const histogramData = [
    ['Оценка', 'Количество'],
    ['1', 1],
    ['2', 0],
    ['3', 0],
    ['4', 0],
    ['5', 0],
    ['6', 1],
    ['7', 0],
    ['8', 0],
    ['9', 0],
    ['10', 2],
  ];

  console.log(histogramData)

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
            <div>

            </div>
            <Chart
            //style={{width: "100px"}}
         width={300}
         height={200}
        chartType="BarChart" // Используем тип графика ColumnChart для гистограммы
        loader={<div>Loading Chart</div>}
        data={map}
        options={{
          title: 'Распределение оценок',
          legend: { position: 'none' },
         
          bars: 'horizontal',
          backgroundColor: 'transparent', // Убираем фон графика
          colors: ['rgb(247, 217, 24)'], // Задаем желтый цвет полосок
          bar: { groupWidth: '80%' }, // Устанавливаем ширину полосок
        }}
        
      />
           
          </div>

        </div>

        {info}

        {certificates}

      
        {getComments}

      </div>


       

      
    
    </div>
  
  )
}


