import React from 'react'
import Star from "../star.svg"
import Heart from "../heart.svg"
import FilledHeart from "../filledheart.svg"

export const TeacherCard = ({teacher}) => {

    const [liked, setLiked] = React.useState(false);
   
  return (
    <div className='teacher'>

        <div>
            <img
                src = {teacher.fileName = null ? `` : `https://via.placeholder.com/300` }
                alt='teacher '
            ></img>
        </div>

        <div>
            <button >
                <img 

                    src= {liked? FilledHeart : Heart} 

                    alt='like'
                    onClick={(e)=>{
                       setLiked(!liked)
                    }}
                />
            </button>
           
        </div>

        <div>
            <h2>{teacher.firstName}</h2>
            <p>тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание тут будет досаточно длинное описание</p>
            <h4>Стоимость занятий: {teacher.lessonPrice} бун</h4>

            {
                teacher.purposes.map((p) => (
                    <p key={p.id}>{p.purpose}</p>
                ))
            }
            
        
         
        </div>

        <div>
            
            {teacher.finalRating.toFixed(2)}
          
            <img
                src={Star}
                alt='stars'
            ></img>
            
        </div>

        

        
    </div>
  )
}