import React, { useContext } from 'react'
import Logo from "../images/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../context/context';

const Header = () => {

  const {currentUser, logout} = useContext(Context)
  
  return (
    <header className='main-header'>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 logo">
            <Link to="/">
              <img src={Logo} alt='logo'/>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navigator">
              <ul class="nav">
                {/* <li class="menu-item active">
                  <Link className='header-link' to="/">
                    Posts
                  </Link>
                </li>
                <li class="menu-item">
                  <Link className='header-link' to="/?cat=journal">
                    Journal
                  </Link>
                </li>
                <li class="menu-item">
                  <Link className='header-link' to="/?cat=random">
                    Random
                  </Link>
                </li> */}
              </ul>
              {currentUser ? 
              (
                <div className='user'>
                  <span>{currentUser.username}</span>
                  <span className='header-btn'>
                    <Link to="/write">Write</Link>
                  </span>
                  <span onClick={logout} className='header-btn'>
                    Logout
                  </span>
                </div>
              ) : 
              (
                <div className='user'>
                  <span className='header-btn'>
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              )}
              
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header