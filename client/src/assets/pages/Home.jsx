import React, { useEffect, useState} from 'react';
import Like from "../components/Like.jsx";
import Comment from "../components/Comment.jsx"
import { Link, useNavigate, useLocation} from "react-router-dom";
import axios from "axios"
import moment from "moment"

const Home = () => {
  const [blogs, setBlogs] = useState([])

  const cat = useLocation().search
  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get("/posts")
        setBlogs(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [cat])

  return (
    <main>
      <div className="container thread-list body-pd">
        {blogs.map((blog) =>
          <div className='thread' key={blog.id}>
            <Link to={`/post/${blog.id}`}>
              <h3 className='title'>{blog.title}</h3>
            </Link>
            <p className='desc'>{blog.desc}</p>
            <div className="quick-stats">
              <div className='social'>
                <Like
                  numberOfLikes={1}
                  threadId={blog.id}
                />
                <Comment
                  numberOfComments={1}
                  threadId={blog.id}
                />
              </div>
              <span>Posted: {moment(blog.date).fromNow()}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
