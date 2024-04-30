import React, { useState } from 'react';
import { NewPost } from '../../services/postService.js';

export const CreatePost = ({currentUser}) => {
 // State to hold the form inputs
 const [title, setTitle] = useState('');
 const [body, setBody] = useState('');
 const [assembledPost, setAssembledPost] = useState({title:"", body:"", userId:currentUser.id, topic:1})

 // Handler for form submission
 const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    assembledPost.title=title
    assembledPost.body=body
    assembledPost.userId=currentUser.id
    NewPost({assembledPost})
 };

 return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
 )
}