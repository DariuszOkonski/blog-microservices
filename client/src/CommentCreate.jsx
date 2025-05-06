import axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>

      {/* <h6>Comment Create</h6>
      <p>id: {postId}</p> */}
    </div>
  );
};

export default CommentCreate;
