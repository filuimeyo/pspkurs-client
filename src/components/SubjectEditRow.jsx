import React , {useState, useRef, useEffect} from 'react'
import axios from 'axios';

const UPDATE_PIC_API_URL = "http://localhost:8080/api/v1/admin/subject/pic/"
const UPDATE_NAME_API_URL = "http://localhost:8080/api/v1/admin/subject/name/"



export const SubjectEditRow = ({subject, handleDeleteClick, handleСancelСlick, handleAddClick}) => {
    const fileInputRef = useRef(null);
    const [fileSource, setFileSource] = useState('');


    const [subjectName, setSubjectName] = useState('');

  

    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        setIsEditable(true);
    };


    const handleSaveClick = () => {
        setIsEditable(false);

        const token =  localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };


        if(subject){
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
           
            

            axios.put(`${UPDATE_PIC_API_URL}${subject.id}`, formData, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
    
            const formData2 = new FormData();
            
            formData2.append('name', subjectName );
    
            axios.put(`${UPDATE_NAME_API_URL}${subject.id}`, formData2, {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
        } else{
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
            formData.append('name', subjectName)

            handleAddClick(formData);
        }
       



    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const source = e.target.result;
          setFileSource(source);
        };

        reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    fileInputRef.current.value = null;
    setFileSource('');
  };

 const searcSubject = ()=>{
    if(subject){
        setSubjectName(subject.name)
        if (subject.filename) {
          setFileSource("http://localhost:8080/api/v1/public/info/subjects/pic/" + subject.filename);
          fileInputRef.current.value = ""; // Очистка значения file input
        }
    }
    else{
        setIsEditable(true)
    }
 }

  useEffect(searcSubject, [subject]);

  return (

    <>
        <td>
            <div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} disabled={!isEditable} />
                {fileSource && (
                <>
                    <div className='editimgdiv'>
                        <img src={fileSource} alt="Selected File" />
                    </div>
                    {
                        !subject &&
                        <button  onClick={handleRemoveFile} disabled={!isEditable}>Удалить картинку</button>
                    }
                </>
                 )}
            </div>
        </td>
        <td>
            <input type="text" disabled={!isEditable} value={subjectName}    onChange={(e) => setSubjectName(e.target.value)}/>
        </td>
        <td>
           

            {
                isEditable ?
                (
                    <button onClick={handleSaveClick}>
                     {subject? "Сохранить" : "Добавить"}
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
                subject ?
                (
                    <button onClick={()=> handleDeleteClick(subject.id)}>
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
