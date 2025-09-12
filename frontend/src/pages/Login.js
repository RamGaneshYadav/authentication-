import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';



function Login() {
  const [loginInfo, setLoginInfo]=useState({
    email:'',
    password:''

  })
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo};
    copyLoginInfo[name]=value;
    setLoginInfo(copyLoginInfo);

  }
   console.log('loginInfo->',loginInfo)// real time data update
  // useEffect(() => {
  //   console.log("Updated loginInfo ->", loginInfo);
  // }, [signupInfo]);
  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    
      if ( !email && !password) {
        return handleError("Email and Password are required");
      }
      if (email && !password) {
        return handleError("Password is required");
      }
      if (!email && password) {
        return handleError("Email is required");
      }
      if (!email) {
          return handleError("Email is required");
        }
        if (!password) {
          return handleError("Password is required");
        }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      
      const result=await response.json();
      console.log("server Response->",result);
      const {success , message,jwtToken,name,error}=result;
      if(success){  //data successfully insert 
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/home')
        },1000)

      }
      // else if(error){
      //   const details=error?.details[0].message;
      //   handleError=(details);
      // }
      //  error showing
      else if(error){
  const details = error?.details?.[0]?.message || "Something went wrong";
  handleError(details);  
}

      else if(!success){// data not present
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
      console.log(err);
    }
  }
  return (

    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* <div>
          <label htmlFor='name'>name</label>
          <input
          onChange={handleChange}
          type='text'
          name='name'
          autoFocus
          placeholder='Enter Your Name'
          value={loginInfo.name}
          />
        </div> */}
        <div>
        <label htmlFor='email'>Email</label>
          <input
          onChange={handleChange}
          autoFocus
          type='email'
          name='email'
          placeholder='Enter Your Email'
          value={loginInfo.email}
          />
        </div>
        
        <div>
          <label htmlFor='password'>Password</label>
          <input
          onChange={handleChange}
          type='password'
          name='password'
          placeholder='Enter Your Password'
          value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>i does't  an account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login;