import React, { useContext } from 'react'
import moment from "moment"
import { Context } from '../context/context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reply = ({commentId, blogId, username, content, time, data, depth, update}) => {
    const {currentUser} = useContext(Context)
    const navigate = useNavigate();

    const onDelete = async () => {
        try {
            console.log("hellow")
          await axios.delete(`/comments/replies/${commentId}`)
          update(commentId)
        } catch (err) {
          console.log(err)
        }
    }

  return (
    <div  style={{"padding-left":`${depth*10}px`}}>
        <div className="reply">
            <div className="info">
            <span>By: {username}</span>
            <div>
                {currentUser?.username === username && (
                    <i onClick={onDelete} class="fa fa-trash"></i>
                )}
                <span>Posted: {moment(time).fromNow()}</span>
            </div>
            </div>
            <div>
                {content}
            </div>
        </div>
        {
            data?.filter(e => e.parent === commentId).map(reply =>
                <Reply 
                    key={reply.id}
                    commentId={reply.id}
                    username={reply.username}
                    content={reply.content}
                    data={data}
                    time={reply.time}
                    depth={depth+1}
                    update={update}
                />
            )
        }
    </div>
  )
}

export default Reply