import { formatCurrentTime } from "./likeService.js"

export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts`).then((res) =>
    res.json()
    )
}

export const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}`).then((res) => res.json())
}

export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}`).then((res) => res.json())
}

export const NewPost = ({postObjWithTitleBodyUserIdTopic}) => {
    return fetch('http://localhost:8088/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: postObjWithTitleBodyUserIdTopic.userId,
            title: postObjWithTitleBodyUserIdTopic.title,
            body: postObjWithTitleBodyUserIdTopic.body,
            topic: postObjWithTitleBodyUserIdTopic.topic,
            created_at: formatCurrentTime(),
        }),
    }).then((res) => res.json());
}