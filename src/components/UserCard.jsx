import React from 'react'




export const UserCard = ({user}) => {

    const [blocked, setBlocked] = React.useState(user.accountNonLocked);
   
    
    

  return (
    <div className='usercard'>

        
        <div>
            {
                {
                  'ADMIN': <></>,
                  'STUDENT': <p><span>имя пользователя: </span>{user.student?.firstName}</p>,
                  'TEACHER': <p><span>имя пользователя: </span>{user.teacher?.firstName}</p>,
                }[user.appUserRole]
            }

            <p><span>почта: </span>{user.email}</p>
            <p>{user.appUserRole}</p>
        </div>

        
       
        {
             user.appUserRole!== "ADMIN"?
             (
                 <button
                     className=''
                     onClick={()=>{
                         setBlocked(!blocked);
                         alert(user.id)
                     }}
                 >
                     {
                         blocked? "заблокировать":"разблокировать"
                     }
                 </button>
             ):(<></>)
        }

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
                   
                </>
            ):(<></>)
        }

       
        

    </div>
  )
}
