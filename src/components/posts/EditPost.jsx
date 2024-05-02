import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deletePost, putPost } from '../../services/postService.js';
import { getPostByPostId } from '../../services/postService.js';
import { TopicsDropdown } from '../topicsDropdown/topicsDropdown.jsx';

export const EditPost = ({currentUser}) => {
    const {postId} = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState(0);
    const [isOwner, setIsOwner] = useState(false); // State to track if the current user is the owner of the post
    const navigate = useNavigate();

    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            // Check if the current user is the owner of the post
            if (currentUser.id === data[0].userId) {
                setIsOwner(true); // Set isOwner to true if the current user is the owner
                // Fetch the post data to pre-fill the form fields
                setTitle(data[0].title);
                setBody(data[0].body);
                setTopic(data[0].topic);
            } else {
                setIsOwner(false); // Set isOwner to false if the current user is not the owner
            }
        });
    }, [postId, currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        putPost(currentUser.id, title, body, topic, postId).then(() => {
            navigate(`/posts/${postId}`);
        });
    };

    const handleDelete = (event) => {
        event.preventDefault();
        deletePost(postId).then(() => {
            navigate(`/myposts`);
        });
    };

    // Conditionally render the form or the message based on isOwner
    return (
        <div>
            <h2>Edit Post</h2>
            {isOwner? (
                <form className='post' onSubmit={handleSubmit}>
                    <div>
                        <TopicsDropdown onTopicChange={(selectedTopicId) => setTopic(selectedTopicId)} />
                    </div>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: "300px", height: "30px" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            style={{ width: "100%", height: "100px" }}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleDelete}>Delete</button>
                </form>
            ) : (
                <p>Hold on a second, you don't own this post. Try editing one of your own posts.</p>
            )}
        </div>
    );
};
