import React from 'react'
import { useLocation } from 'react-router-dom'
import { TeacherCard } from '../components/TeacherCard'
import {useEffect, useState} from "react";

const API_URL = 'http://localhost:8080/api/v1/registration/teacher/subject/'

export const TeachersPage = () => {



  const location = useLocation()
  const { id } = location.state

  const [teachers, setTeachers] = useState([]);
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



  return (
    <div>

       {            
            teachers?.length > 0
            ? (
                <div className="container">

					
                    {
                        teachers.map((teacher) => (
                          // <div>{subject[0].name}</div>
                           <TeacherCard teacher={teacher} />
                        ))
                    }
                </div>
            ):
            (
                <div className="empty">
                    <h2>No teachers found</h2>
                </div>
            ) 
        }
    </div>
  )
}
