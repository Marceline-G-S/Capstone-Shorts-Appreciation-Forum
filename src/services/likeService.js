import { getPostByPostId } from "./postService.js"


export const getLikes = (userId, postId) => {
    return fetch(`http://localhost:8088/likes?postId=${postId}&userId=${userId}`).then((res) => res.json())
}

export const getLikedPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/likes?userId=${userId}`).then((res) => res.json());
}



export const likePost = (userId, postId) => {
    
    return fetch('http://localhost:8088/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: parseInt(userId),
            postsId: parseInt(postId),
            created_at: formatCurrentTime(),
        }),
    }).then((res) => res.json());
};



export const unlikePost = (like) => {
    return fetch(`http://localhost:8088/likes/${like.id}`, {
        method: 'DELETE',
    }).then((res) => res.json());
};


const formatCurrentTime = () => {
    // Create a new Date object for the current date and time
    var now = new Date();

    // Extract the date and time components
    var year = now.getFullYear()
    var month = now.getMonth() + 1; // Months are 0-based, so we add 1
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Pad single-digit months, days, hours, minutes, and seconds with a leading zero
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // Format the date and time as a string
    var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return formattedDateTime;
}