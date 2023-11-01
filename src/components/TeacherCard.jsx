import React from 'react'

import Heart from "../heart.svg"

export const TeacherCard = ({teacher}) => {
  return (
    <div className='teacher'>

        <div>
            <img
                src = {teacher.fileName = null ? `` : `https://via.placeholder.com/300`}
            ></img>
        </div>

        <div>
           <img src={Heart}/>
        </div>

        <div>
            <h2>{teacher.firstName}</h2>
            <p>тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание</p>
            <h4>Стоимость занятий: {teacher.lessonPrice} бун</h4>

            {
                teacher.purposes.map((p) => (
                    <p>{p.purpose}</p>
                ))
            }
            
        
         
        </div>

        <div>
            {teacher.finalRating.toFixed(2)}
            
        </div>

        

        
    </div>
  )
}
