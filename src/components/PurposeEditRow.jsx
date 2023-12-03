import React , {useState,  useEffect} from 'react'
import axios from 'axios';


const PURPOSE_API_URL = "http://localhost:8080/api/v1/admin/purpose"


export const PurposeEditRow = ({ purpose, handleDeleteClick, handleСancelСlick, handleAddClick}) => {
   
   


    const [purposeName, setPurposeName] = useState('');

  

    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        setIsEditable(true);
    };


    const handleSaveClick = () => {
        setIsEditable(false);

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };

       

        if(purpose){

            const body ={}
            body.id = purpose.id
            body.purpose = purposeName
            
            axios.put(PURPOSE_API_URL, body, {headers})
            .then(response => {
              // Handle success
                alert(response.data)
            })
            .catch(error => {
              // Handle error
              alert(error)
              console.error(error);
            });
        } else{
            const body ={}
            body.purpose = purposeName
            handleAddClick(body)
        }

        
    }

    


 const searcSubject = ()=>{
    if(purpose){
        setPurposeName(purpose.purpose)
        
    }
    else{
        setIsEditable(true)
    }
 }

  useEffect(searcSubject, [purpose]);

  return (

    <>
       
        <td>
            <input type="text" disabled={!isEditable} value={purposeName}    onChange={(e) => setPurposeName(e.target.value)}/>
        </td>
        <td>
           

            {
                isEditable ?
                (
                    <button onClick={handleSaveClick}>
                     {purpose? "Cохранить" : "Добавить"}
                    </button>
                ):(
                    <button onClick={handleEditClick} disabled={isEditable}>
                     Редактировать
                    </button>
                )
                
            }
        </td>

        <td>
            {
                purpose ?
                (
                    <button onClick={()=> handleDeleteClick(purpose.id)}>
                        Удалить
                    </button>
                ):(
                    <button onClick={()=> handleСancelСlick()}>
                        Отмена
                    </button>
                )


               
            }
        </td>
    </>

    
  );
}
