import { useEffect, useState } from "react"
import { FilterBar } from "./FilterBar.jsx";
import { Post } from "./Post.jsx";
import "./post.css"
import { Link } from "react-router-dom";
import { getLikedPostsByUserId } from "../../services/likeService.js";
import { getAllPosts } from "../../services/postService.js";
import { getUserById } from "../../services/userService.js";

export const MyLikedPosts = ({ currentUser }) => {
    const [displayedPosts, setdisplayedPosts] = useState([]);
    const [allLikedPosts, setAllLikedPosts] = useState([]);
    const [searchBar, setSearchBar] = useState("")
    const [likedArr, setLikedArr] = useState([])

    useEffect(() => {
        getAllPosts().then(posts => {
            setAllLikedPosts(posts);
            return getLikedPostsByUserId(currentUser.id);
        }).then(likedPosts => {
            setLikedArr(likedPosts);
        });
    }, [currentUser]);

    useEffect(() => {
            const filteredPosts = allLikedPosts.filter(post => likedArr.some(like => like.postsId === post.id));
            setdisplayedPosts(filteredPosts);
    }, [likedArr]);
    
    useEffect(() => {
        setdisplayedPosts(allLikedPosts.filter((post) => post.title.toLowerCase().includes(searchBar.toLocaleLowerCase()) ))
    }, [searchBar, allLikedPosts])

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





    /*//Checks to ensure currentUser is set correctly.
    useEffect(() => {
        if (currentUser?.id){
            getLikedPostsByUserId(currentUser.id).then(postsArr => {setAllLikedPosts(postsArr);
            setdisplayedPosts(postsArr)})
        }
    }, [currentUser])

    //Gets all posts for the user
    useEffect(() => {
        getLikedPostsByUserId(currentUser?.id).then(postsArr => {setAllLikedPosts(postsArr)})
    }, [currentUser])
    
    //Sets the posts
    useEffect(() => {
        setdisplayedPosts(allLikedPosts.filter((post) => post.title.toLowerCase().includes(searchBar.toLocaleLowerCase()) ))
    }, [searchBar, allLikedPosts])*/

    /*useEffect(() => {
        getAllPosts().then(setAllLikedPosts)
        getLikedPostsByUserId(currentUser.id).then(setLikedArr)
        setAllLikedPosts(allLikedPosts.filter(post => likedArr.some(like => like.postsId === post.id)))
        setdisplayedPosts(allLikedPosts)
    }, [])*/

    /*useEffect(() => {
        getAllPosts().then(posts => {
            setAllLikedPosts(posts);
            return getLikedPostsByUserId(currentUser.id);
        }).then(likedPosts => {
            setLikedArr(likedPosts);
            const filteredPosts = allLikedPosts.filter(post => likedArr.some(like => like.postsId === post.id));
            setdisplayedPosts(filteredPosts);
        });
    }, [currentUser]);*/