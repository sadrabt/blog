import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", inputs)
      setError("")
      navigate("/login")
    } catch(err) {
      setError(err.response.data);
    }
  }


  return (
    <div className="login">
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 login-card text-center">
            <h1>Register</h1>
            <form>
              <input
                required
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                required
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Register</button>
              <p>{error}</p>
              <span>
                Have an account? <br/> <Link to="/login">Login</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
