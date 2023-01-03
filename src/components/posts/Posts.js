import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deletePost, getAllPosts } from "../../managers/PostManager.js"
import { isStaff } from "../../utils/isStaff.js"
import "./posts.css"



export const PostList = (props) => {
    const [ allPosts, setAllPosts ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllPosts().then(data => setAllPosts(data))
    }, [])


    return (
        <article className="posts">
            <h2 className="header">News</h2>
                {
                    isStaff()
                    ?
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            navigate({ pathname: "/posts/new" })
                        }}
                    >Create Post</button>
                    : ""

                }

            
            {
                allPosts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
                                <a href={`posts/${post.id}`} className="card-img-actions">
                                    <img src={post.image} className="card-img img-fluid" width="96" height="350" alt="" />
                                </a>
                                <a href={`posts/${post.id}`} className="card-img-actions">
                                    <h2 class="card-img img-fluid" width="96" height="350" alt="">{post.title}</h2>
                                </a>
                                <div>By {post.user.full_name}</div>
                                {
                                    isStaff()
                                    ?
                                    <button onClick={() => deletePost(post.id)}>Delete</button> 
                                    :
                                    ""
                                }
                        
                    </section>
                })
            }
        </article>
    )
}