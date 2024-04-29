import { useParams } from "react-router-dom"
import { getPostByPostId } from "../../services/postService.js"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"


export const PostDetails = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [poster, setPoster] = useState({})

    useEffect(()=>{
        getPostByPostId(postId).then((data) => {setPost(data[0])})
    }, [postId])

    useEffect(()=>{
        getUserById(post.userId).then((poster0) => setPoster(poster0[0]))
    }, [post])

    return <><section className="post">
            <header className="post-header">{post?.title}</header>
            <div><span className="post-info">Posted by user : </span>{poster?.username}</div>
            <div><span className="post-info">Topic : </span>{post?.topic}</div>
            <div><span className="post-info">Posted at : </span>{post?.created_at}</div>
            <div><span className="post-info">Post body : </span>{post?.body}</div>
        </section>
    </>
}