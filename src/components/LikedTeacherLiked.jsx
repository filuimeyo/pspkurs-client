import React from 'react'
import Heart from "../heart.svg"
import FilledHeart from "../filledheart.svg"

export const LikedTeacherLiked = ({teacher}) => {

    const [liked, setLiked] = React.useState(true);

  return (
    <div className='likedteacheronprofiledpage'>
        <div>
            <div>
                <img
                    src={teacher.fileName != null ? "http://localhost:8080/api/v1/registration/teacher/profileimage/file/"+teacher.fileName : "https://via.placeholder.com/300"}
                    alt='teacher '
                ></img>

            </div>

            <p>
                {teacher.firstName}
            </p>

        </div>
        
        

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
