import React from 'react'
import { useLocation } from 'react-router-dom'
import { TeacherCard } from '../components/TeacherCard'
import {useEffect, useState} from "react";
import Up from "../up.svg"
import Down from "../down.svg"

const API_URL = 'http://localhost:8080/api/v1/registration/teacher/subject/'

const purposes =  [
    {
        "id": 1,
        "purpose": "подготовка к экзаменам"
    }, 
    {
        "id": 2,
        "purpose": "усовершенствование знаний"
    },  
    {
        "id": 3,
        "purpose": "изучение основ"
    },
    {
        "id": 4,
        "purpose": "для детей"
    }
]

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

  const [selectedPurpose, setSelectedPurpose] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [order, setOrder] = useState(true);

  const [teachers, setTeachers] = useState([]);
//   const [searchTerm, setSeachTerm] = useState('');

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

        <div className="filterscontainer">

            <div className='selectdiv'>
                <select 
                   value={selectedPurpose}
                   defaultValue={"выберите цель"}
                   onChange={(e) => setSelectedPurpose(e.target.value)}
                >
                    <option disabled={true}  value={"выберите цель"}>выберите цель</option>
                    {
                        purposes.map((purpose)=>
                         <option 
                            key={purpose.id} 
                            value={purpose.purpose}>{purpose.purpose}
                        </option>
                        )
                    }

                </select>
            </div>
            


            <div className='selectdiv'>
                <select 
                   value={selectedSort}
                   defaultValue={"сортировать по"}
                   onChange={(e) => setSelectedSort(e.target.value)}
                >
                    <option disabled={true}  value={"сортировать по"}>сортировать по</option>
                    {
                        sort.map((sort)=>
                         <option 
                            key={sort.id} 
                            value={sort.purpose}>{sort.purpose}
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
