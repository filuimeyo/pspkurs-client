import React from 'react'
import Star from "../star.svg"
import OutlinedStar from "../outlinedstar.svg"

export const CommentCard = ({comment}) => {
  return (
    <div className='comment'>

        <div className='commentpic'>
            <img 
                src={comment[1].fileName != null ? "": "https://via.placeholder.com/300"} 
                alt={comment[1].firstName}
            ></img>
        </div>

        <div>
            <h4>{comment[1].firstName}</h4>
            <div>
                {[...Array(comment[0].rating)].map((x, i) =>
                    <img
                        src={Star}
                        alt='stars'
                        key={i}
                    ></img>
                )}
                {[...Array(10-comment[0].rating)].map((x, i) =>
                    <img
                        src={OutlinedStar}
                        alt='outstars'
                        key={i}
                    ></img>
                )}
            </div>

            <p>
                {comment[0].comment}
            </p>
        </div>

    </div>
  )
}
