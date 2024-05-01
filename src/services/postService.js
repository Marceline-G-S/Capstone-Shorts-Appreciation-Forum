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

export const NewPost = (userId, title, body, topic) => {
    return fetch('http://localhost:8088/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body,
            topic: topic,
            created_at: formatCurrentTime(),
        }),
    }).then((res) => res.json());
}