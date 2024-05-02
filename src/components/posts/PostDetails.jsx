import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postService.js";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService.js";
import { getLikes, likePost, unlikePost } from "../../services/likeService.js";
import { getTopicById } from "../../services/topicService.js";
import { Link } from "react-router-dom"; // Import Link for navigation

export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [poster, setPoster] = useState({});
    const [likes, setLikes] = useState({});
    const [topic, setTopic] = useState({});

    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            setPost(data[0]);
            getLikes(currentUser?.id, postId).then((likes0) => {
                setLikes(likes0[0]);
            });
        });
    }, [postId, currentUser]);

    useEffect(() => {
        getUserById(post?.userId).then((poster0) => {
            setPoster(poster0[0]);
            if (post?.topic) {
                getTopicById(post?.topic).then((topic0) => {
                    setTopic(topic0);
                });
            }
        });
    }, [post]);

    const handleLike = () => {
        if ((likes?.userId == currentUser.id)) {
            // Unlike the post
            unlikePost(likes).then(() => {
                setLikes({ userId: 0, id: 0 });
            });
        } else {
            // Like the post
            likePost(currentUser.id, postId).then(() => {
                getLikes(currentUser.id, postId).then((likes0) => {
                    setLikes(likes0[0]);
                });
            });
        }
    };

    // Check if the current user is the poster of the post
    const isCurrentUserPoster = currentUser?.id === poster?.id;

    return (
        <>
            <section className="post">
                <header className="post-header">{post?.title}</header>
                <div><span className="post-info">Posted by user : </span>{poster?.username}</div>
                <div><span className="post-info">Topic : </span>{topic?.topicName}</div>
                <div><span className="post-info">Posted at : </span>{post?.created_at}</div>
                <div><span className="post-info">Post body : </span>{post?.body}</div>
                <div>
                    <button className="form-btn btn-primary" onClick={handleLike}>
                        {(likes?.userId == currentUser.id)? 'Unlike' : 'Like'}
                    </button>
                    {/* Conditionally render the Edit button */}
                    {isCurrentUserPoster && (
                        <Link to={`/posts/edit/${postId}`} className="btn btn-edit">
                            <button className="form-btn btn-secondary">Edit</button>
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
};
