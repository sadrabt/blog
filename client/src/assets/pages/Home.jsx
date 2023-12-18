import React, { useEffect, useState} from 'react';
import Like from "../components/Like.jsx";
import Comment from "../components/Comment.jsx"
import { Link, useLocation} from "react-router-dom";
import axios from "axios"
import moment from "moment"

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [count, setCount] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const itemsPerPage = 15

  const cat = useLocation().search
  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get("/posts/count/")
        setCount(resp.data[0]['COUNT(*)'])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [cat])
  
  useEffect( () => {
    const getData = async () => {
      try {
        const resp = await axios.get(`/posts/${itemsPerPage}/${(pageNum - 1) * itemsPerPage}`)
        setBlogs(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [cat, pageNum])

  const onChangePage = (e) => {
    e.preventDefault()
    if (e.target.text === "Previous") {
      setPageNum(pageNum-1)
    } else if (e.target.text === "Next") {
      setPageNum(pageNum+1)
    } else {
      setPageNum(parseInt(e.target.text))
    }
  }

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
                  blogId={blog.id}
                />
                <Comment
                  blogId={blog.id}
                />
              </div>
              <span>Posted: {moment(blog.date).fromNow()}</span>
            </div>
          </div>
        )}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={"page-item" + (pageNum === 1 ? " disabled" : "")}>
              <a onClick={e => onChangePage(e)}  className="page-link" href="" tabindex="-1">Previous</a>
            </li>
            {
              Array.from(Array(Math.ceil(count/itemsPerPage)), (e, i) => {
                return <li className={"page-item" + (pageNum === i+1 ? " active" : "")}><a value={i+1} onClick={e => onChangePage(e)} class="page-link" href="">{i+1}</a></li>
              })
            }
            <li className={"page-item" + (pageNum ===  Math.ceil(count/itemsPerPage) ? " disabled" : "")}>
              <a onClick={e => onChangePage(e)}  className="page-link" href="">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default Home
