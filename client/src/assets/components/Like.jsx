import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Context } from '../context/context';

const Like = ({blogId}) => {
  const navigate = useNavigate();
  const {currentUser} = useContext(Context)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect( () => {
    const getData = async () => {
      try {
        const user = currentUser ? currentUser.id : -1
        const resp = await axios.get(`/likes/${blogId}/${user}` )
        setLikes(parseInt(resp.data[0]['likes']))
        setLiked(parseInt(resp.data[0]['liked']))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [blogId, currentUser, liked])


  const onLike = async () => {
    
    try {
      const user = currentUser ? currentUser.id : -1
      if (user != -1) {
        const resp = await axios.post(`/likes/`, {id: blogId, user})
        setLiked(!liked)
      } else {
        // navigate("/login")
        alert("You need to login to like a post")
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='likes-container'>
        <i onClick={onLike} className={"fa fa-thumbs-up" + (liked ? " liked" : "")}></i>
        <span>
            {likes}
        </span>
    </div>
  )
}

export default Like