import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../context/context';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  })

  const {login} = useContext(Context)

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      setError("")
      navigate("/")
    } catch(err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="login">
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 login-card text-center">
            <h1>Login</h1>
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
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Login</button>
              <p>{error}</p>
              <span>
                Don't have an account? <br/> <Link to="/register">Register</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login