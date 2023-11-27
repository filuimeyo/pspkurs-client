import React from 'react'
import Star from "../star.svg"
import OutlinedStar from "../outlinedstar.svg"

export const CommentCard = ({comment}) => {
  return (
    <div className='comment'>



        <div className='commentpic'>
            <img 
                src={comment.student.fileName != null ? "": "https://via.placeholder.com/300"} 
                alt={comment.student.name}
            ></img>
        </div>

        <div>
            <h4>{comment.student.name}</h4>
            <div>
                {[...Array(comment.rating)].map((x, i) =>
                    <img
                        src={Star}
                        alt='stars'
                        key={i}
                    ></img>
                )}
                {[...Array(10-comment.rating)].map((x, i) =>
                    <img
                        src={OutlinedStar}
                        alt='outstars'
                        key={i}
                    ></img>
                )}
            </div>

            <p>
                {comment.comment}
            </p>
        </div>

    </div>
  )
}
