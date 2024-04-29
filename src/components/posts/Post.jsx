import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.js"

export const Post = ({post}) => {
  const [poster, setPoster] = useState({})

  useEffect(() => {
    getUserById(post.userId).then((poster0) => {setPoster(poster0[0])})
  }, [])


  return <section className="post">
  <header className="post-info">#{post.id}</header>
  <div>{post.title}</div>
  <footer>
    <div>
      <div className="post-info">Posted by:</div>
      <div>{poster.username}</div>
      <div className="post-info">Created :</div>
      <div>{post.created_at}</div>
    </div>
  </footer>
</section>
}