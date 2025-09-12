import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';




function Home() {
    const [loggedInUser,setLoggedInUser] =useState('');// local storage
    const [products,setProducts] =useState('');
     const navigate = useNavigate();

  useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedInUser'))// key loggedInUser is return a name 
  },[])

const handleLogout =(e)=>{
    localStorage.removeItem('token'); // remove token
    localStorage.removeItem('loggedInUser'); // remove user name
    handleSuccess('User Log out');
    setTimeout(() => {
      navigate('/login')
      
    },1000 );
}

const fetchProducts= async () =>{
  try {
    const url="http://localhost:8080/products";
    // pass  a token
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')// fatch token from localstorage
      }
    }
    const response =await fetch(url,headers);//send url with token
    const result =await response.json();
    console.log(result);
    setProducts(result);
  } catch (err) {
    handleError(err);
  }
}
useEffect(()=>{
  fetchProducts()
},[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
        

          
           products && products?.map((item,index)=>(
            <ul key={item._id || index}>
             <span>{item.firstname} :{item.lastname}:{item.email} : {item.phone}: {item.location}: {item.hobby}:{}</span>
            </ul>
          ))
        }
      </div>
      
      <ToastContainer/>
      </div>
      
  )
}

export default Home