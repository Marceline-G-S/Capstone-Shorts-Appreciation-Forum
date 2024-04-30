import { useParams } from "react-router-dom"
import { getPostByPostId } from "../../services/postService.js"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"
import { getLikes, likePost, unlikePost } from "../../services/likeService.js"


export const PostDetails = ({ currentUser }) => {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [poster, setPoster] = useState({})
    const [likes, setLikes] = useState({})

    // This fetches the post data
    useEffect(()=>{
        getPostByPostId(postId).then((data) => {setPost(data[0])

        //This checks to see if they post was liked by the current user to know which button to display
        getLikes(currentUser.id, postId).then((likes0)=>{setLikes(likes0[0])})
        })
    }, [postId, currentUser, likes])

    //This fetches data for who posted the post.
    useEffect(()=>{
            getUserById(post.userId).then((poster0) => {setPoster(poster0[0])
        })
    }, [post])

    // This function adds or removes a like from the Likes table. 
    const handleLike = () => {
        if ((likes?.userId == currentUser.id)) {
          // Unlike the post
          unlikePost(likes).then(() => {
            setLikes({userId:0, id:0})
          });
        } else {
          // Like the post
          likePost(currentUser.id, postId).then(() => {
            getLikes(currentUser.id, postId).then((likes0)=>{setLikes(likes0[0])});
          });
        }
     };

    return <><section className="post">
            <header className="post-header">{post?.title}</header>
            <div><span className="post-info">Posted by user : </span>{poster?.username}</div>
            <div><span className="post-info">Topic : </span>{post?.topic}</div>
            <div><span className="post-info">Posted at : </span>{post?.created_at}</div>
            <div><span className="post-info">Post body : </span>{post?.body}</div>
            <div><button className="form-btn btn-primary" onClick={handleLike}>{(likes?.userId == currentUser.id) ? 'Unlike' : 'Like'}</button></div>
        </section>
    </>
}