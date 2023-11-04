import React from 'react'
import {useEffect, useState} from "react";
import SearchIcon from "../search.svg"
import { SubjectCard } from '../components/SubjectCard';

const API_URL = 'http://localhost:8080/api/v1/registration/subject'


export const SubjectsPage = () => {


    const [subjects, setSubject] = useState([]);

    const [searchTerm, setSeachTerm] = useState('');

    const searcSubjects = async (title) => {  
        const responce = await fetch(
            `${API_URL}?name=${title}`,{});
            
        
        const data = await responce.json();
    
        setSubject(data);  
    }
  
       useEffect(()=>{  
            searcSubjects('') 
        }, [])

    


  return (
    
   <div>
    
        <div className="search">
            <input 
                placeholder="Search for subjects"
                value= {searchTerm}
                onChange={(e) => setSeachTerm(e.target.value)}
            />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searcSubjects(searchTerm)}
            />
        </div> 

        {
            
            subjects?.length > 0
            ? (
                <div className="container">

					
                    {
                        subjects.map(subject => (
                          // <div>{subject[0].name}</div>
                           <SubjectCard key={subject[0].id} subject={subject} />
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

   </div>
    
  )
}
