import React, { useEffect, useState } from 'react'
import axios from "axios"

const Comment = ({blogId, updated}) => {
  const [comments, setComments] = useState(0)
  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get(`/comments/${blogId}` )
        setComments(parseInt(resp.data[0]['comments']))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [blogId, updated])

  return (
    <div className='likes-container'>
        <i class="fa fa-comment"></i>
        <span>
            {comments}
        </span>
    </div>
  )
}

export default Comment