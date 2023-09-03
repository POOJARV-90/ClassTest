import React, { useState } from 'react'
import {toast }from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Compo/Style/Register.css'

const Register = () => {
    const [userdata , setUserdata] = useState({name:"",email:"",password:"",confirmpassword:"",role:"Buyer",number:"",pin:""})
    const Router = useNavigate();

    const HandleChange = (event) =>{
        setUserdata({...userdata,[event.target.name]:event.target.value})
    }

    const HandleChangeRole = (event) =>{
        setUserdata({...userdata,"role":event.target.value})
    }
   
    const Handlesubmit = async (event) => {
        event.preventDefault();
        if (userdata.name && userdata.email && userdata.password && userdata.confirmpassword && userdata.role && userdata.number && userdata.pin) {
            if (userdata.password === userdata.confirmpassword) {
                const response = await axios.post("http://localhost:8000/register", { userdata });
                if (response.data.success) {
                    setUserdata({ name: "", email: "", password: "", confirmpassword: "", role: "",number:"",pin:"" })
                    Router('/Login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
    
            } else {
                toast.error("Password and Confirm Password not Matched.")
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }

  return (
    <div id='body'>
        <form onSubmit={Handlesubmit} >
            <label >Name</label> <br />
            <input value={userdata.name} onChange={HandleChange} name='name' type="text" /><br />

            <label >Email</label> <br />
            <input onChange={HandleChange} value={userdata.email} name='email' type="email" /><br />
            <label>Select your role</label> <br />
            <select onChange={HandleChangeRole}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            </select> <br />
            <label >Password</label> <br />
            <input value={userdata.password} onChange={HandleChange} name='password' type="password" /><br />

            <label >Confirm Password </label> <br />
            <input value={userdata.confirmpassword} onChange={HandleChange} type="password" name='confirmpassword'/><br />

             <br />

             <label >Pin</label> <br />
            <input value={userdata.pin} onChange={HandleChange} name='pin' type="text" /><br />

            <label >Number </label> <br />
            <input value={userdata.number} onChange={HandleChange} type="text" name='number'/><br />

             <br />
            <input id='button' type="submit" value="REGISTER" />
        </form>
    </div>
  )
}

export default Register