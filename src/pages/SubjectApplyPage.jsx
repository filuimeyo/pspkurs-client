import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const SUBBJECTS_API_URL = 'http://localhost:8080/api/v1/public/info/subjects?name='
const PURPOSES_API_URL = "http://localhost:8080/api/v1/public/info/purposes"

const APPLY_SUBJECT_API_URL = "http://localhost:8080/api/v1/student/applyforsubject"

export const SubjectApplyPage = () => {

    const navigate = useNavigate();

    const [selectedSubject, setSelectedSubject] = useState('0')
    const [selectedPurpose, setSelectedPurpose] = useState()


    const [subjects, setSubjects] = useState([])
    const [purposes, setPurposes] = useState([])


    const fetchInfo = async () => {  
        
        Promise.all([
            fetch(`${SUBBJECTS_API_URL}`,{}),
            fetch(`${PURPOSES_API_URL}`,{}),
         
          ])
            .then(([resSubjects, resPurposes]) => 
              Promise.all([resSubjects.json(), resPurposes.json()])
            )
            .then(([dataSubjects, dataPurposes]) => {
   
              setSubjects(dataSubjects);  
              setPurposes(dataPurposes);
              
            })
    
    }

    useEffect(()=>{  
        fetchInfo() 
    }, [])


    const handleSubjectClick = (e) => {
        setSelectedSubject(e.target.value);
    }


    const handlePurposeClick = (e) => {
        setSelectedPurpose(e.target.value);
    }

    const handleResetClick = (e) => {
        setSelectedPurpose(undefined);
    }


    const handleApplyClick = (e) =>{
        const body = {}
        body.subjectId = subjects[selectedSubject][0];
        if(selectedPurpose){
            body.purposeId = purposes[selectedPurpose].id;
        }
       

        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
		};
    
        axios.post( APPLY_SUBJECT_API_URL, body, {headers})
        .then(res => {
          console.log(res.data)
          alert(res.data)
          navigate("/profilestudent"); 
        })
        .catch(res => navigate("/login") )
    }


  return (
    <div>
      
        {
            subjects.length>0 &&
            <>
               
                <div className='subjectapply'>
                <h4 className='subjectapplyh4' >Выберите предмет <span>(обязательно)</span> </h4>
                    <div className='contain'>
                        {
                            subjects.map((subject, i) =>
                                (
                                    <button 
                                       key={subject[0]}
                                        value={i} 
                                        disabled={selectedSubject === `${i}`} 
                                        onClick={(handleSubjectClick)}
                                        className='subjectbutton'
                                    >
                                    
                                        <div>
                                            <img src={subject[2]!= null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+subject[2] : "https://via.placeholder.com/300"} 
                                            alt={subject[1]}
                                            />
                                        </div>
                                        <p> {subject[1]}</p>
                                    </button>
                                )
                            )
                        }
                    </div>
                    
                </div>

            </>

            
        }

        {
            purposes.length>0 &&
            <>
               
                <div className='subjectapply'>
                    <h4 className='subjectapplyh4'>Выберите цель</h4>
                    <div className='contain'>
                    {
                        purposes.map((purpose, i) =>
                            (
                                <button 
                                    key={purpose.id}
                                    value={i} 
                                    disabled={selectedPurpose === `${i}`} 
                                    onClick={(handlePurposeClick)}
                                    className='purposebutton'
                                >
                                {purpose.purpose}
                                </button>
                            )
                        )
                    }
                    </div>

                    <button
                        onClick={(handlePurposeClick)}
                        className='restbtn'
                    >
                        сбросить
                    </button>
                    
                 </div>
            </>

           
        }

        <button
            className='applybtn'
            onClick={(handleApplyClick)}
        >   Оформить заявку
        </button>
        
    </div>
  )
}



