import React from 'react'

const Like = ({numberOfLikes, threadId}) => {
  return (
    <div className='likes-container'>
        <i class="fa fa-thumbs-up"></i>
        <span>
            {numberOfLikes}
        </span>
    </div>
  )
}

export default Like