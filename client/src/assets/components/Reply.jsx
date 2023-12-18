import React, { useContext, useState } from 'react'
import moment from "moment"
import { Context } from '../context/context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReplyBox from './ReplyBox.jsx'
import DOMPurify from "dompurify"
import Like from './Like.jsx'

const Reply = ({commentId, blogId, username, content, time, data, depth, update}) => {
    const {currentUser} = useContext(Context)
    const [showReply, setShowReply] = useState(false)
    const navigate = useNavigate();

    const onDelete = async () => {
        try {
          await axios.delete(`/comments/replies/${commentId}`)
          update()
        } catch (err) {
          console.log(err)
        }
    }

    const openReply = async () => {
        if (currentUser) {
            setShowReply(!showReply)
        } else {
            navigate("/login")
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

            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
            {showReply && <ReplyBox
                blog={blogId}
                parent={commentId}
                update={update}
            />}
            <div>
                <span onClick={openReply} className='reply-prompt'>Reply</span>
                <Like
                  id={commentId}
                  isComment={true}
                />
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