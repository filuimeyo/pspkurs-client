import React from 'react'
import { useLocation } from 'react-router-dom'
import { TeacherCard } from '../components/TeacherCard'
import {useEffect, useState} from "react";
import Up from "../up.svg"
import Down from "../down.svg"

const API_URL = 'http://localhost:8080/api/v1/public/info/teachers/'
const PURPOSES_API_URL = "http://localhost:8080/api/v1/public/info/purposes"



const sort =  [
    {
        "id": 1,
        "purpose": "стоимости занятия"
    }, 
    {
        "id": 2,
        "purpose": "рейтингу"
    }
]

export const TeachersPage = () => {

  const location = useLocation()
  const { id } = location.state

  const defaultPurpose = {
    id: -1, 
    purpose: "выберите цель"
  }

  const [selectedPurpose, setSelectedPurpose] = useState(defaultPurpose.id);
  const [selectedSort, setSelectedSort] = useState(sort[0].id);
  const [order, setOrder] = useState(true);

  const [teachers, setTeachers] = useState([]);
  const [purposesArr, setPurposes] = useState([]);

  

    const searcTeachers = async (order, sortType, purposeId) => {  
        
        Promise.all([
            fetch(`${API_URL}${id}?order=${order}&sort=${sortType}&purposeId=${purposeId}`,{}),
            fetch(`${PURPOSES_API_URL}`,{}),
         
          ])
            .then(([resTeacher, resPurposes]) => 
              Promise.all([resTeacher.json(), resPurposes.json()])
            )
            .then(([dataTeacher, dataPurposes]) => {
               
              setTeachers(dataTeacher);  
              setPurposes(dataPurposes)
            })
    
    }
  
       useEffect(()=>{  
            searcTeachers(order, 1, -1) 
        }, [])



  return (
    <div>

        <div className="filterscontainer">

            <div className='selectdiv'>
                <select 
                   value={selectedPurpose}
                   //defaultValue={defaultPurpose.id}
                   onChange={(e) => {
                     setSelectedPurpose(e.target.value);
                   }}
                >
                    <option    value={defaultPurpose.id}>{defaultPurpose.purpose}</option>
                    {
                        purposesArr.map((purpose)=>(
                            <option key={purpose.id} value={purpose.id}>
                                {purpose.purpose}
                            </option>
                        ))
                    }

                </select>
            </div>
            


            <div className='selectdiv'>
                <select 
                   value={selectedSort}
                  
                   onChange={(e) => {
                    setSelectedSort(e.target.value);
                }}
                >
                    {
                        sort.map((sort)=>
                         <option 
                            key={sort.id} 
                            value={sort.id}>{sort.purpose}
                        </option>
                        )
                    }

                </select>
            </div>

        
            <div className='orderbutton'>
                <div>
                    <img 
                        src= { order? Down : Up} 
                        alt= {order? "down" :"up"}
                        onClick={(e)=>{
                           setOrder(!order)
                        }}
                    />
                </div>
            </div>

            <div className='orderbutton'>
                <button
                    onClick={ (e)=>searcTeachers(order, selectedSort, selectedPurpose)}
                >
                    Найти
                </button>
            </div>
            

        </div> 

       {            
            teachers?.length > 0
            ? (
                <div className="container">

					
                    {
                        teachers.map((teacher) => (
                          // <div>{subject[0].name}</div>
                           <TeacherCard key={teacher.id} teacher={teacher} />
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
