import React from 'react'

export const TeacherCertificatesBlock = ({certificate}) => {
  return (
    <>
        <div className='certificate'>
        <img 
          key={certificate.id}
          src={certificate.fileName != null ? " http://localhost:8080/api/v1/registration/teacher/imageofdocs/"+certificate.fileName : "https://via.placeholder.com/300"}
          alt='certificate '
        ></img>
    </div>
    <div className='certificate'>
        <img 
          key={certificate.id}
          src={certificate.fileName != null ? " http://localhost:8080/api/v1/registration/teacher/imageofdocs/"+certificate.fileName : "https://via.placeholder.com/300"}
          alt='certificate '
        ></img>
    </div>
    <div className='certificate'>
        <img 
          key={certificate.id}
          src={certificate.fileName != null ? " http://localhost:8080/api/v1/registration/teacher/imageofdocs/"+certificate.fileName : "https://via.placeholder.com/300"}
          alt='certificate '
        ></img>
    </div>
    </>
  )
}
