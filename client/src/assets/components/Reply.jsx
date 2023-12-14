import React, { useContext } from 'react'
import moment from "moment"
import { Context } from '../context/context'

const Reply = ({commentId, username, content, time, data, depth}) => {
    const {currentUser} = useContext(Context)

    const onDelete = () => {
        
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
                />
            )
        }
    </div>
  )
}

export default Reply