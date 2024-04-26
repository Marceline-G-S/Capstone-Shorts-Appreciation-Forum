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

export const getLikedPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/likes?userId=${userId}&?expand=posts}`).then((res) => res.json())
}