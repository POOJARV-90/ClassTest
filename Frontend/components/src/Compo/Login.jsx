import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [userdata , setUserdata] = useState({email:"",password:""})
    const Router = useNavigate();

    const HandleChange = (event) =>{
        setUserdata({...userdata,[event.target.name]:event.target.value})
    }

    const HandleSubmit = async (event) =>{
        event.preventDefault();
        if ( userdata.email && userdata.password ) {
            
                const response = await axios.post("http://localhost:8000/login", { userdata });
                try {
                    if (response.data.success) {
                        setUserdata({  email: "", password: "" })
                        Router('/Login')
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error("OOPS something went wrong pleace try again")
                }
    
           
        } else {
            toast.error("All fields are mandtory.")
        }
    }

  return (
    <div id='body' >
        <form onSubmit={HandleSubmit}>
            <label>Email</label><br />
            <input name='email' value={userdata.email} onChange={HandleChange} type="email" /> <br />

            <label>Password</label><br />
            <input name='password'  onChange={HandleChange}  type="password" value={userdata.value} /> <br />

            <input id='button' type="submit" value='LOGIN'/>
        </form>
    </div>
  )
}

export default Login