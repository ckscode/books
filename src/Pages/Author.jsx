import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { thisId } from '../App';
import { useNavigate } from 'react-router-dom';

const Author = () => {
    const {id,setId} = useContext(thisId)
    const [data,setData] = useState([]);
     const [authorData,setAuthor] = useState()
     const navigate= useNavigate();
    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },[]);
      const fetchData = () => {
            axios.get(`https://6642ef123c01a059ea20db85.mockapi.io/api/books/`).then((e)=>setData(e.data)).catch((error)=>console.log(error))
           
      };
    useEffect(()=>{
        setAuthor(data.filter((e)=>e.id===id))
    },[data])
     console.log(authorData)
      return (
        <div className='form-background '>
        <div className="form ">
            {authorData&&authorData.map((ele,index)=>{
                return(
                    <div key={ele.id}>
                          <h1>
                    {ele.author}
                   </h1>
                  
                   <p className='mb-0 fw-bold'>Birthdate</p>
                   {ele.birthdate?<p>{ele.birthdate}</p>:<p>click edit to add birthdate</p>}
                   
                   <p className='mb-0 fw-bold'>About Author</p>
                   <p>{ele.bio}</p>
                   <div className="w-100 d-flex">
          <button  onClick={() =>{setId(ele.id) ;navigate(`/author/edit/${ele.id}`)}} className="ms-auto btn btn-success button">
            Edit
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-danger ms-3"
          >
            Cancel
          </button>
          </div>
                 
                    </div>
                  
                )
                 
            })}
            
        </div>
        </div>
    );
   }



export default Author;