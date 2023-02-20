import { getToken } from "../utils/getToken"


export const getAllPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(post)
     })
        
}

export const updatePost = (post, postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(post)
     })
        
}
