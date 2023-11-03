import React from 'react'
import { SmallTeacherCard } from '../components/SmallTeacherCard';

export const TeacherSubjectCard = ({subjects, id}) => {
  return (
    <div  className='subjectAndApply'>
        <div>
        {
            subjects.map(subject =>(
                <SmallTeacherCard key={subject.id} subject={subject}/>
            ))  
        }
        </div>


        <button>
            Передаю сюда id :{id}
        </button>
    </div>
    
  )
}
