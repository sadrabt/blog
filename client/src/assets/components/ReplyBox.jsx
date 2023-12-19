import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';

const ReplyBox = ({blog, parent, update}) => {
    const [content, setContent] = useState('')

    const onSubmit = async () => {
        try {
          console.log(blog)
          await axios.post(`/comments/`, {
              blog,
              parent,
              content,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            })
            setContent("")
            update()
        } catch (err) {
          console.log(err)
        }
      }
    
  return (
    <div>
        <div className="editorContainer comment-box">
            <ReactQuill theme='snow' value={content} onChange={setContent}>

            </ReactQuill>
          </div>
            <button onClick={onSubmit} className='btn'>Comment</button>
    </div>
  )
}

export default ReplyBox