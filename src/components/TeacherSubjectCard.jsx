import React from 'react'
import { SmallTeacherCard } from '../components/SmallTeacherCard';

export const TeacherSubjectCard = ({subjects, lessonPrice, id}) => {
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

        <button
          onClick={(e)=>{alert(`Подать заявку для учителя с id: ${id}`)}}
        >
          Подать заявку
        </button>
    </div>
    
  )
}
