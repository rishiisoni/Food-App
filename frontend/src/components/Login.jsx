import { useContext, useEffect, useState } from "react"
import "../css/Login.css"
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export default function Login( { setShowLogin } ){

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Sign up");
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const handlechange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData)=>({...prevData,[name]:value}));
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        let newurl = url;

        if(currState === "Login"){
            newurl+="/api/user/login";
        } else {
            newurl+="/api/user/register";
        }

        const response = await axios.post(newurl, data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }

    }

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    return (
        <div className="login">
            <form onSubmit={handleLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={()=> setShowLogin(false)}/>
                </div>
                <div className="login-input">
                    {currState==="Login" ? <></> : <input onChange={handlechange} value={data.name} name="name" type="text" placeholder="Type name" required />}
                    <input onChange={handlechange} name="email" value={data.value} type="email" placeholder="Type email" required />
                    <input onChange={handlechange} name="password" value={data.password} type="password" placeholder="Type password" required />
                </div>
                <button type="sumbit" >{currState==="Sign up"? "Create Account" : "Login"}</button>
                <div className="login-condition">
                    <input type="checkbox" required/>
                    <p>By continuing, I agree to the terms of use and privacy policy.</p>
                </div>
                {
                    currState==="Login" ? <p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Click here</span></p>
                }

            </form>
        </div>
    )
}