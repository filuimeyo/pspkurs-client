import React from 'react'



const u ={
    "id": 3,
    "email": "admin@gmail.com",
    "password": "$2a$10$nvbOrLeOefDBUK3tiLV8B.CO01bV.EnGTPBwxKne/nRZ7RpWOd9Bi",
    "appUserRole": "ADMIN",
    "locked": false,
    "enabled": false,
    "teacher":null,
    "student": null,
    "accountNonLocked": true,
    "authorities": [
        {
            "authority": "STUDENT"
        }
    ],
    "accountNonExpired": true,
    "credentialsNonExpired": true
}
export const UserCard = ({user}) => {

   

  return (
    <div className='usercard'>

        

        {
            user.teacher?
            (
                <>
                    <div className='accoutnpic'>
                        <img
                        src={user.teacher.fileName != null ? "http://localhost:8080/api/v1/registration/teacher/profileimage/file/"+ user.teacher.fileName : "https://via.placeholder.com/300"}
                        alt='teacher '
                        ></img>
                    </div> 
                    <p><span>имя пользователя: </span>{user.teacher.firstName}</p>
                </>
                
            ):(<></>)
        }


        {
            user.student?
            (
                <>
                    <div className='accoutnpic'>
                        <img
                        src={user.student.fileName != null ? ""+ user.student.fileName : "https://via.placeholder.com/300"}
                        alt='teacher '
                        ></img>
                    </div> 
                    <p><span>имя пользователя: </span>{user.student.firstName}</p>
                </>
            ):(<></>)
        }

        <p><span>почта: </span>{user.email}</p>
        <p>{user.appUserRole}</p>
       
        <button>
            {
                user.accountNonLocked? "заблокировать":"разблокировать"
            }
        </button>
        

    </div>
  )
}
