import React from 'react'
import { SmallTeacherCard } from '../components/SmallTeacherCard';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';

import {Modal} from './Modal';

const APPLY_TEACHER_API_URL = "http://localhost:8080/api/v1/student/applyforteacher"

export const TeacherSubjectCard = ({subjects, lessonPrice, id}) => {
  const { user, setUser } = React.useContext( UserContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = React.useState('0')

  const handleSubjectClick = (e) => {
    setSelectedSubject(e.target.value);
  }


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleApplyClick = (e) =>{
    const body = {}
    body.subjectId = subjects[selectedSubject].id;
    body.teacherId = id

    const token =  localStorage.getItem("token");

    const headers = {
    Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
    };

   

    axios.post( APPLY_TEACHER_API_URL, body, {headers})
    .then(res => {
      console.log(res.data)
      alert(res.data)
      navigate("/profilestudent"); 
    })
    .catch(res => navigate("/login") )
  }



  return (
    <div  className='subjectAndApply'>
        <div>
        {
            subjects.map(subject =>(
                <SmallTeacherCard key={subject.id} subject={subject}/>
            ))  
        }
        </div>

        <div>
          <h5>Стоимость занятия: {lessonPrice} бун</h5>
        </div>

        {
          user &&
          <button
            className='first'
            onClick={(openModal)}
          >
            Подать заявку
          </button>
        }

    
       
        {isOpen && (
            <div>
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h4 className='subjectapplyh4' >Выберите предмет <span>(обязательно)</span> </h4>
                 
                   
                        <div className='contain'>
                            {
                                subjects.map((subject, i) =>
                                    (
                                        <button 
                                           key={subject.id}
                                            value={i} 
                                            disabled={selectedSubject === `${i}`} 
                                            onClick={(handleSubjectClick)}
                                            className='subjectbutton'
                                            
                                        >
                                        
                                            <div>
                                                <img src={subject.filename!= null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+subject.filename : "https://via.placeholder.com/300"} 
                                                alt={subject.name}
                                                />
                                            </div>
                                            <p> {subject.name}</p>
                                        </button>
                                    )
                                )
                            }
                        </div>
                        
                        <button className='apl' onClick={handleApplyClick}>подать заявку</button>
                    

                </div>
              </div>
          </div>
        )}
  
       
    </div>
    
  )
}
