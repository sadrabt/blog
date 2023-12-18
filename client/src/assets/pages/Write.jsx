import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from "moment"

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state
  const [title, setTitle] = useState(state?.title || '')
  const [desc, setDesc] = useState(state?.desc || '')
  const [content, setContent] = useState(state?.content || '')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      state 
      ? await axios.put(`/posts/${state.id}`, {
          title,
          desc,
          content,
          edit: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        })
      : await axios.post(`/posts/`, {
          title,
          desc,
          content,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        })
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className='write'>
      <div className="container">
        <div className='body-pd'>
          <input value={title} onChange={e=>setTitle(e.target.value)} class = "title" type="text" placeholder='Title'/>
          <input value={desc} onChange={e=>setDesc(e.target.value)} class = "title"  type="text" placeholder='Sub Title'/>
          <div className="editorContainer">
            <ReactQuill theme='snow' value={content} onChange={setContent}>

            </ReactQuill>
          </div>
            <div>
              <button onClick={onSubmit} className='btn'>Submit</button>
            </div>
        </div>
      </div>
    </main>
  )
}

export default Write