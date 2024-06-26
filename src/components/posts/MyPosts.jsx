import { getPostsByUserId } from "../../services/postService.js";
import { useEffect, useState } from "react"
import { FilterBar } from "./FilterBar.jsx";
import { Post } from "./Post.jsx";
import "./post.css"
import { Link } from "react-router-dom";

export const MyPosts = ({ currentUser }) => {
    const [displayedPosts, setdisplayedPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [searchBar, setSearchBar] = useState("")

    useEffect(() => {
        if (!!currentUser.id){
            getPostsByUserId(currentUser.id).then(postsArr => {setAllPosts(postsArr);
            setdisplayedPosts(postsArr)})
        }
    }, [currentUser])

    
    useEffect(() => {
        setdisplayedPosts(allPosts.filter((post) => post.title.toLowerCase().includes(searchBar.toLocaleLowerCase()) ))
    }, [searchBar, allPosts])

    return <>
        <div className="posts-container">
            <h2>Posts : </h2>
            <FilterBar setSearchBar={setSearchBar}/>
            <article className="posts">
                {displayedPosts.map((postObject) => {
                return <Link key={postObject.id} to={`/posts/${postObject.id}`}>
                        <Post post={postObject} key={postObject.id}/>
                    </Link>
                })}
            </article>
        </div>
    </>
}