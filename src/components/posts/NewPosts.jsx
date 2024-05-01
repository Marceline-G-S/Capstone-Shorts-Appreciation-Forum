import React, { useState } from 'react';
import { NewPost } from '../../services/postService.js';
import { TopicsDropdown } from '../topicsDropdown/topicsDropdown.jsx';
import { useNavigate } from 'react-router-dom';

export const CreatePost = ({currentUser}) => {
 // State to hold the form inputs
 const [title, setTitle] = useState('');
 const [body, setBody] = useState('');
 const [topic, setTopic] = useState(0)
 const navigate = useNavigate()

 // Handler for form submission
 const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    NewPost(currentUser.id, title, body, topic).then((post)=>{navigate(`/posts/${post.id}`)})
 };

 return (
    <div>
      <h2>Create a New Post</h2>
      <form className='post' onSubmit={handleSubmit}>
        <div>
          <TopicsDropdown onTopicChange={(selectedTopicId) => {setTopic(selectedTopicId)}} />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(typedTitle) => setTitle(typedTitle.target.value)}
            style={{ width: "300px", height: "30px" }}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(typedBody) => setBody(typedBody.target.value)}
            style={{ width: "100%", height: "100px" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
 )
}