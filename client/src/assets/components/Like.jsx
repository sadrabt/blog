import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Context } from '../context/context';

const Like = ({id, isComment = false}) => {
  const navigate = useNavigate();
  const {currentUser} = useContext(Context)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect( () => {
    const getData = async () => {
      try {
        const user = currentUser ? currentUser.id : -1
        const resp = await axios.get(`/likes${isComment? "/comments":""}/${id}/${user}` )
        console.log(resp.data[0])
        setLikes(parseInt(resp.data[0]['likes']))
        setLiked(parseInt(resp.data[0]['liked']))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, currentUser, liked])


  const onLike = async () => {
    
    try {
      const user = currentUser ? currentUser.id : -1
      if (user != -1) {
        const resp = await axios.post(`/likes${isComment? "/comments":""}/`, {id: id, user})
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