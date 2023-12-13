import React from 'react'

const Comment = ({numberOfComments, threadId}) => {
  return (
    <div className='likes-container'>
        <i class="fa fa-comment"></i>
        <span>
            {numberOfComments}
        </span>
    </div>
  )
}

export default Comment