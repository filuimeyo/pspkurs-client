import React from 'react'
import {useEffect, useState} from "react";
import { PopularSubjectCard } from '../components/PopularSubjectCard';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1/public/info/popular'

export const MainPage = () => {

  const [subjects, setSubject] = useState([]);

  
  const searcSubjects = async () => {  
    const responce = await fetch(
        `${API_URL}`,{});
    
    const data = await responce.json();
   
    setSubject(data);  
  }

  useEffect(()=>{  
    searcSubjects('') 
  }, [])

  return (

    <div>
      <h2>Самые популярные предметы</h2>

      {
        subjects?.length > 0
        ? (
            <div className="container">
      
                {
                    subjects.map(subject => (
                      // <div>{subject[0].name}</div>
                      <PopularSubjectCard key={subject.id} subject={subject}/>
                       
                    ))
                }
            </div>
        ):
        (
            <div className="empty">
                <h2>No subjects found</h2>
            </div>
        ) 
      }

      <Link style={{ textDecoration: 'none' }} to={"/subjects"}>
        <button className='allSubjects'>все предметы</button>
      </Link>
      

    </div>
  )
}
