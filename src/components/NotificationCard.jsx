import React from 'react'

export const NotificationCard = ({notification, student, role}) => {


  let teacher;
 

  let message;
  let details;


  switch(role){
    case "STUDENT" : {
      if(notification.feedbackType!=null){
        switch(notification.feedbackType){
          case 'REFUSED':{
            message = "К сожалению вам отказали"
            details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' пришел отказ.\n`;
            break
          }
          case 'OK': {
            message = "Преподаватель откликнулся на вашу заявку!"
            details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
            ${notification.application.subject.name}, ${notification.application.teacher.name} откликнулся(-лась) на вашу заявку.\n
            Вы можете связаться с преподавателем по почте: ${notification.email}`;
            break
          }
        }
      } else{
        message =  "Новый отклик на заявку!"
        details = `На вашу заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
          ${notification.application.subject.name}, ${notification.teacher.name} откликнулся(-лась) на вашу заявку. \n
          Вы можете связаться с преподавателем по почте: ${notification.email}
        `
      }
      break;
    }
    case "TEACHER" : {
      if(notification.feedbackType!=null){
        switch(notification.feedbackType){
          case 'REFUSED':{
            message = "Вы отказались"
            details = `Вы отказались от заявки от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}'`;
            break
          }
          case 'OK': {
            message = "Вы откликнулись на заявку !"
            details = `Вы откликнулись на заявку  от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}'`
            break
          }
        }
      } else{
        message =  "Вы откликнулись на заявку !"
        details = `Вы откликнулись на заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}'`
      }
      break;
    }
    case "ADMIN" : {
      if(notification.feedbackType!=null){
        switch(notification.feedbackType){
          case 'REFUSED':{
            message = "Преподаватель откзал"
            details = `На заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' пришел отказ.`;
            teacher =
                <div>
                <span>Преподаватель: </span>

                  <span>
                    { notification.application.teacher.name}
                  </span>

                </div>

            break
          }
          case 'OK': {
            message = "Преподаватель откликнулся заявку!"
            details = `На  заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
            ${notification.application.subject.name}, ${notification.application.teacher.name} откликнулся(-лась) на заявку.`;
            teacher = 
                <div>
                <span>Преподаватель: </span>

                  <span>
                    {  notification.application.teacher.name}
                  </span>

                </div>
           
            break
          }
        }
      } else{
        message =  "Новый отклик на заявку!"
        details = `На заявку от ${notification.application.applicationDate.slice(0,10)} по предмету '${notification.application.subject.name}' откликнулся преподаватель.\n
          ${notification.application.subject.name}, ${notification.teacher.name} откликнулся(-лась) вашу заявку. `
          teacher =
              <div>
                <span>Преподаватель: </span>

                  <span>
                    {   notification.teacher.name}
                  </span>

              </div>
          
         
      }
    }
    break;
  }


 
 

  const arr = details.split('\n')
  
  return (
    <div 
        className='notification'
    >
      <h5> {notification.applicationDate.slice(0,10)} {notification.applicationDate.slice(11,16)}</h5>
      <h4>{message}</h4>


      {
          student != null &&
          <div>
            <span>Студент: </span>
          
              <span>{student.name}</span>
            
          </div>
      }

      
          
          {teacher}

      {
        details != null?
        (
         
          arr.map((str, i) =>
            <p key={i}>{str}</p>
          )
        ):(<></>)
      }

        

        
    </div>
  )
}
