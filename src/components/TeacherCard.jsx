import React from 'react'
import Star from "../star.svg"
import Heart from "../heart.svg"
import FilledHeart from "../filledheart.svg"
import { Link } from 'react-router-dom'

export const TeacherCard = ({teacher}) => {

    const [liked, setLiked] = React.useState(false);

    let rating;
    if(teacher.finalRating !== 0.0){
        rating = 

            <div>
                
                {teacher.finalRating.toFixed(2)}

                <img
                    src={Star}
                    alt='stars'
                ></img>

            </div>
        
    }
   
  return (

    
        <div className='teacher'>

            <Link to="/teacher"  state={{ id: teacher.id }} className='content'>
                <div>
                    <img
                        src={teacher.filename != null ? "http://localhost:8080/api/v1/public/info/teachers/pic/"+teacher.filename : "https://via.placeholder.com/300"}
                        alt='teacher '
                    ></img>
                </div>


                <div>
                    <h2>{teacher.name}</h2>
                    <p>{teacher.info}</p>
                    <h4>Стоимость занятий: {teacher.lessonPrice} бун</h4>

                    {
                        teacher.purposes.map((p) => (
                            <p key={p.id}>{p.purpose}</p>
                        ))
                    }
                </div>

                {rating}
            </Link>            
            

            
           {/*
            <div className='like'>
                <button>
                    <img 

                        src= {liked? FilledHeart : Heart} 

                        alt='like'
                        onClick={(e)=>{
                           setLiked(!liked)
                        }}
                    />
                </button>
            </div>
            */}


        </div>

  )
}

