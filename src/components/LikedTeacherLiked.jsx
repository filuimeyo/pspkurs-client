import React from 'react'
import Heart from "../heart.svg"
import FilledHeart from "../filledheart.svg"
import { Link } from 'react-router-dom'

export const LikedTeacherLiked = ({teacher}) => {

    const [liked, setLiked] = React.useState(true);

  return (
    <div className='likedteacheronprofiledpage'>
        <Link  to="/teacher"  state={{ id: teacher.id }} style={{textDecoration: 'none'}} className='linkteacher'>
            {/* <div className='linkteacher'> */}
                <div>
                    <img
                        src={teacher.fileName != null ? "http://localhost:8080/api/v1/registration/teacher/profileimage/file/"+teacher.fileName : "https://via.placeholder.com/300"}
                        alt='teacher '
                    ></img>

                </div>

                <p>
                    {teacher.firstName}
                </p>

            {/* </div> */}
        </Link>
        
        
        

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

        
    </div>
  )
}
