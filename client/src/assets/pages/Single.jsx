import React, { useContext, useEffect, useState } from 'react'
import Like from "../components/Like.jsx";
import Comment from "../components/Comment.jsx"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment"
import { Context } from '../context/context.jsx';
import DOMPurify from "dompurify"
import Reply from '../components/Reply.jsx';
import ReplyBox from '../components/ReplyBox.jsx';


const Single = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(Context)
  const [blog, setBlog] = useState({})
  const [replies, setReplies] = useState([])
  const [repliesUpdated, setRepliesUpdated] = useState(0)

  const loc = useLocation()
  const id = loc.pathname.split("/")[2]
  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get(`/posts/${id}`)
        setBlog(resp.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get(`/comments/replies/${id}`)
        setReplies(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, repliesUpdated])

  const update = () => {
    setRepliesUpdated(repliesUpdated+1)
  }

  const onDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main class = "single">
      <div className="container">
        <div className="body-pd">
          <div className="headings">
            <h1>
              {blog.title}
            </h1>
            <h6>
              {blog.desc}
            </h6>
          </div>
          <div className="info">
            <span>
              By: {blog.username}
            </span>
            <span>
              {blog.edit?`Last edited: ${(moment(blog.edit).format('llll'))}`:(moment(blog.date).format('llll'))}
            </span>
          </div>
          <div className="action">
            <div className='social'>
                <Like
                  id={blog.id}
                />
                <Comment
                  blogId={blog.id}
                  updated={repliesUpdated}
                />
              </div>
            {currentUser?.username === blog.username && (
              <div className="edit">
                <Link to={`/write?edit=${id}`} state={blog}>
                  <i class="fa fa-pen"></i>
                </Link>
                <i onClick={onDelete} class="fa fa-trash"></i>
              </div>
            )}
          </div>
          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content)}} className='thread-body'>
          </p>
          {currentUser?  <ReplyBox 
            blog={id}
            parent={null}
            update={update}
          /> :
            <button onClick={() => {navigate("/login")}} className='btn'>Login to Comment</button>
          }
          

          <div className="replies">
          {
            replies.filter(e => e.parent === null).map(reply => 
              <Reply
                key={reply.id}
                blogId={blog.id}
                commentId={reply.id}
                username={reply.username}
                content={reply.content}
                time={reply.time}
                data = {replies}
                depth={0}
                update={update}
              />
            )
          }
        </div>
        </div>
      </div>
    </main>
  )
}

export default Single