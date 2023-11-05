import React from 'react'

export const ProfileStudentCard = ({user}) => {
  return (
    <div className='profilePage'>
        <div>
            <img
                src={user.student.fileName != null ? ""+user.student.fileName : "https://via.placeholder.com/300"}
                alt='user pic'
            ></img>
        </div>
        <div>
            <input type='text'
            // placeholder='password'
            value = {user.student.firstName}
            />
            <input type='email'
            // placeholder='password'
            value = {user.email}
            />
            <button onClick={(e) => alert(user.id)}>
                Изменить пароль
            </button>
        </div>
    </div>
  )
}
