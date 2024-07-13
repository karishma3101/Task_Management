import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signup.css';
function Sineup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState();
    const navigate=useNavigate("");
    function handleSubmit(e)
    {
        e.preventDefault();
        axios.post("http://localhost:3003/register", {name,email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err));
        navigate('/Login');
    }
    return(
        <div className="index">
         <div className="main">
            <div>
                <h2>
                    Register
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <lable htmlFor="email">
                         <strong>Name: </strong>
                        </lable>
                        <input type="text" className="block1" id="name" placeholder="Enter Name" autoComplete="off"
                        onChange={(e)=>setName(e.target.value)}></input>
                    </div>
                    <div className="input">
                        <lable htmlFor="email">
                         <strong>Email: </strong>
                        </lable>
                        <input type="email" className="block2" id="name" placeholder="Enter Email" name="email" autoComplete="off"  onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="input">
                        <lable htmlFor="email">
                         <strong>Password: </strong>
                        </lable>
                        <input type="password" className="block3" id="name" placeholder="Enter Password" name="email" autoComplete="off"  onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                    <p className="p">Already Have An Account</p>
                    <Link className="link" to="/login" >Login</Link>
                </form>
            </div>
         </div>
        </div>
    )

}
export default Sineup;