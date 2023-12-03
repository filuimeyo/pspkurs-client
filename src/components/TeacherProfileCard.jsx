import React from 'react'

import { UserContext } from '../App';
import { useState , useContext, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import DeleteIcon from "../deleteicon.svg"



const SUBJECTS_API_URL = "http://localhost:8080/api/v1/teacher/subjects"
const PURPOSES_API_URL = "http://localhost:8080/api/v1/teacher/purposes"

const UPDATE_PROFILE_URL = "http://localhost:8080/api/v1/teacher/profile"

const UPDATE_PIC_API_URL = "http://localhost:8080/api/v1/teacher/pic"

export const TeacherProfileCard = ({suser}) => {

    const fileInputRef = useRef(null);
    const [fileSource, setFileSource] = useState('');

    const [todelte, setToDelete] = useState(false)

   

    const [selectedOption, setSelectedOption] = useState('');

    const [name, setName]= useState('')
    const [info, setInfo] = useState('');
    const [price, setPrice] = useState(0)


    const { user, setUser } = useContext( UserContext);
    const [isEditable, setIsEditable] = useState(false);
    const [purposes, setPurposes] = useState([])
    const [subjects, setSubjects] = useState([])


    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [selectedPurposes, setSelectedPurposes] = useState([])

    const handleSave = () =>{
        const body = {}
        body.name = name;
        body.info = info;
        body.lessonPrice = price;
        body.purposes = selectedPurposes.map(obj => obj.id);
        body.subjects = selectedSubjects.map(obj => obj.id);

        const token =  localStorage.getItem("token");
        const headers = {
			Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
		};
        console.log(body)
        //axios.put(UPDATE_PROFILE_URL, body, {headers})
        //    .then(response => {
        //      // Handle success
        //        alert('successfully updated profile')
        //        console.log(response.data)
        //    })
        //    .catch(error => {
        //      // Handle error
        //      alert(error)
        //      console.error(error);
        //});

       
       
        if(!todelte){
           
            const formData = new FormData();
            const file = fileInputRef.current.files[0];
            formData.append('file', file);
            
           
          
            axios.put(UPDATE_PIC_API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'}
            })
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              alert(error);
            });
        } else{
            axios.delete(UPDATE_PIC_API_URL,  {headers})
            .then(response => {
              // Handle success
                alert(response.data.message)
            })
            .catch(error => {
              // Handle error
              console.error(error);
            });
        }
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const subject = subjects[selectedValue]
        const updatedArray = [...subjects];
        updatedArray.splice(selectedValue, 1);
        setSubjects(updatedArray);
        setSelectedSubjects([...selectedSubjects, subject]);
        setSelectedOption('');

    };

    const handleSelectChange2 = (event) => {
        const selectedValue = event.target.value;
        const purpose = purposes[selectedValue]
        const updatedArray = [...purposes];
        updatedArray.splice(selectedValue, 1);
        setPurposes(updatedArray);
        setSelectedPurposes([...selectedPurposes, purpose]);
        setSelectedOption('');

    };


    const searcInfo = async () => {  

        setSelectedSubjects(suser.teacher.teacherSubjects)
        setSelectedPurposes(suser.teacher.purposes)
        setInfo(suser.teacher.info)
        setPrice(suser.teacher.lessonPrice)
        setName(suser.teacher.name)

        setFileSource(suser.teacher.filename != null ? "http://localhost:8080/api/v1/public/info/teachers/pic/"+suser.teacher.filename :"https://via.placeholder.com/300")
        const token =  localStorage.getItem("token");

		const headers = {
			Authorization: `Bearer ${token}`,
	
		};

        try {
            const [response1, response2] = await Promise.all([
              axios.get(PURPOSES_API_URL, {headers}),
              axios.get(SUBJECTS_API_URL, {headers})
            ]);

            

            setPurposes(response1.data)
            setSubjects(response2.data)

            const array1 = selectedSubjects;
              
            const array2 = response2.data;
              
              // Удаление элементов первого массива из второго массива
            const updatedArray = array2.filter(item2 => !array1.some(item1 => item1.id === item2.id));
              
            const array3 = selectedPurposes;
              
            const array4 = response1.data;
              
              // Удаление элементов первого массива из второго массива
            const updatedArray2 = array4.filter(item2 => !array3.some(item1 => item1.id === item2.id));
           

            setSubjects(updatedArray)
            setPurposes(updatedArray2)
    
          
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const handleFileChange = (event) => {
        
       // const file = event.target.files[0];
       // const fileUrl = URL.createObjectURL(file);
       // setFileSource(fileUrl);

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileUrl = e.target.result;
          setFileSource(fileUrl);
        };

        reader.readAsDataURL(file);
  };

  const handleDeleteImage = (event) => {
    suser.teacher.filename = null;
    setFileSource(suser.teacher.filename != null ? "http://localhost:8080/api/v1/public/info/teachers/pic/"+suser.teacher.filename :"https://via.placeholder.com/300")
    fileInputRef.current.value = null;
    setToDelete(true)
  }
    
  
    useEffect(()=>{  
        searcInfo() 
    }, [])

  return (
    <div className='profilePage'>
        <div>
            <div className='imagediv' >
                <img
                    src={fileSource}
                    alt='user pic'
                ></img>
            </div>

            {
                isEditable &&
                <>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange}  />
                    <div>
                    <button onClick={handleDeleteImage}>удалить фото</button>
                    </div>
                   
                </>
                
            }

        </div>
       

        <div>
            <div>
                <input type='text'
                    disabled={!isEditable}
                    value = {name}
                    onChange={(e)=>setName(e.target.value)} 
                />
                <input type='email'
                    disabled={!isEditable}
                    value = {suser.email}
                />
                <button onClick={(e) => alert(suser.id)}>
                    Изменить пароль
                </button>

                <button onClick={(e) => {setUser(false)}}>
                   Выйти
                </button>

                <div  className='rounded'>
                    <div>
                    {
                        selectedSubjects.length > 0 ?
                        (
                           <table className='subjecttable'>
                                <tbody>
                                    {
                                     selectedSubjects.map((subject, index) =>
                                        <tr>
                                            <td>
                                                <Link to={"/teachers"} state={{ id: subject.id }} style={{ textDecoration: 'none', fontSize: '0.8rem' }} >
                                                <div className='imagetd'>
                                                    <img src={subject.filename != null ? "http://localhost:8080/api/v1/public/info/subjects/pic/"+subject.filename : "https://via.placeholder.com/300"} 
                                                            alt={subject.name}
                                                    />
                                                </div>
                                                </Link>
                                            </td>
                                            <td className='text'>
                                                <Link to={"/teachers"} state={{ id: subject.id }} style={{ textDecoration: 'none', fontSize: '0.8rem' }} >
                                                    {subject.name}
                                                </Link>
                                            </td>
                                            <td>
                                                {
                                                    isEditable &&  
                                                    
                                                    
                                                    <div className='delete'>
                                                        <img 
                                                                    src= {DeleteIcon} 
                                                                    alt='delete'
                                                                    onClick={(e)=>{
                                                                        const subject = selectedSubjects[index]
                                                                        const updatedArray = [...selectedSubjects];
                                                                        updatedArray.splice(index, 1);
                                                                        setSelectedSubjects(updatedArray)
                                                                        setSubjects([...subjects, subject])
                                                                    }}
                                                        />
                                                    </div>   
                                                    
                                                }
                                            </td>
                                        </tr>

                                     )
                                    }    
                                </tbody>
                         

                           </table>
                            
                        )
                        :(
                            <h4>Вы пока не добавили ни один предмет</h4>
                        ) 

                        
                    }
                    </div>
            
                    {
                        isEditable &&

                        <select value={selectedOption}  onChange={handleSelectChange}>
                            <option value="" selected="true" disabled>Выберите элемент</option>
                            {subjects.map((item, index) => (
                              <option key={index} value={index}>{item.name}</option>
                            ))}
                        </select>
                        
                    }
                </div>  

                <div className='rounded'>
                    <h5>Стоимость занятия (бун): 
                      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}  disabled={!isEditable} />
                      </h5>
                        
                </div>

                <div className='rounded'>
                    <textarea
                        value={info}
                        onChange={(e)=> {setInfo(e.target.value)}}
                        disabled={!isEditable}
                        rows={20}
                    ></textarea>
                    
                        
                </div>

                

                

                <div className='rounded'>
                    <div>
                    {
                         
                        selectedPurposes.length > 0 ?
                        (
                            <table className='subjecttable'>
                            <tbody>
                                {
                                    selectedPurposes.map((purpose, index) =>
                                        <tr>
                                            <td className='text'>
                                                {purpose.purpose}
                                            </td>
                                            <td>
                                                {
                                                    isEditable &&  
                                                    
                                                    
                                                    <div className='delete'>
                                                        <img 
                                                                    src= {DeleteIcon} 
                                                                    alt='delete'
                                                                    onClick={(e)=>{
                                                                        const purpose = selectedPurposes[index]
                                                                        const updatedArray = [...selectedPurposes];
                                                                        updatedArray.splice(index, 1);
                                                                        setSelectedPurposes(updatedArray)
                                                                        setPurposes([...purposes, purpose])
                                                                    }}
                                                        />
                                                    </div>   
                                                    
                                                }

                                            </td>
                                        </tr>
                                    
                                    )
                                }
                                
                            </tbody>
                            </table>      
                           
                        )
                        :(
                            <h5>Вы пока не добавляли цели</h5>
                        ) 
                    }
                    </div>

                    {
                        isEditable &&

                        <select value={selectedOption}  onChange={handleSelectChange2}>
                            <option value="" selected="true" disabled>Выберите элемент</option>
                            {purposes.map((item, index) => (
                              <option key={index} value={index}>{item.purpose}</option>
                            ))}
                        </select>
                        
                    }
                </div>

                <div>
                    <button onClick={(e)=>{
                        setIsEditable(!isEditable);
                        if(isEditable) handleSave()
                    }}>
                        {
                            !isEditable? "Редактировать":"Сохранить"
                        }
                    </button>
                    {
                        isEditable &&
                        <button onClick={(e)=>{
                            setIsEditable(!isEditable);
                            setFileSource(suser.teacher.filename != null ? "http://localhost:8080/api/v1/public/info/teachers/pic/"+suser.teacher.filename :"https://via.placeholder.com/300")
       
                        }} >
                            Отмена
                        </button>
                    }
                </div>

                

            </div>


            

            
            

        </div>

        
    </div>
  )
}
