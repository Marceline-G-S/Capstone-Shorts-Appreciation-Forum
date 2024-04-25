export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts`).then((res) =>
    res.json()
    )
}

export const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    }).then((res) => res.json())
}

export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}`).then((res) =>
    res.json()
    )
}