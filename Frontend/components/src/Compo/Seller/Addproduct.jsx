import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
     const [userdata , setUserdata] = useState({name:"",image:"",price:"",category:""})
    
     const Router = useNavigate();
     const HandleChange = (event) =>{
        setUserdata({...userdata,[event.target.name]:event.target.value})
    }

    const Handlesubmit = async (event) => {
        event.preventDefault();
        if (userdata.name && userdata.image && userdata.price && userdata.category) {
            
                const response = await axios.post("http://localhost:8000/addproduct", { userdata });
                if (response.data.success) {
                    setUserdata({ name:"",image:"",price:"",category:"" })
                    
                    Router('/Login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
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

            <label >Price</label> <br />
            <input onChange={HandleChange} value={userdata.price} name='price' type="number" /><br />
            
            <label >image</label> <br />
            <input value={userdata.image} onChange={HandleChange} name='image' type="text" /><br />

           

            <label >Category </label> <br />
            <input value={userdata.category} onChange={HandleChange} type="text" name='category'/><br />

             <br />
            <input id='button' type="submit" value="ADD PRODUCT" />
        </form>
    </div>
  )
}

export default Addproduct