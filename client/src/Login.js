import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';
function Login(){
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState();
    const navigate=useNavigate("");
    function handleSubmit(e)
    {
        e.preventDefault();
        axios.post("http://localhost:3003/Login", {email,password})
        .then(result=>{
             console.log(result);
            if(result.data==="success")
            {
                navigate('/task');
            }
            })
        .catch(err=>console.log(err));
       
    }
    return(
        <>
         <div className="main">
            <div>
                <h2>
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                   
                    <div className="input">
                        <lable htmlFor="email">
                         <strong>Email: </strong>
                        </lable>
                        <input type="email" className="block1" id="name" placeholder="Enter Name" name="email" autoComplete="off"  onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <lable htmlFor="email">
                         <strong>Password: </strong>
                        </lable>
                        <input type="password" className="block2" id="name" placeholder="Enter Name" name="email" autoComplete="off"  onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <button className="button1" type="submit">Submit</button>
                    
                    
                </form>
                <Link className="link"to="/register" >Signup</Link>
            </div>
         </div>
        </>
    )

}
export default Login;