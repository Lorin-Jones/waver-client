import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deletePost, getAllPosts } from "../../managers/PostManager.js"
import { isStaff } from "../../utils/isStaff.js"
import "./posts.css"
import { usePosts } from "../../queries/posts.js"



export const PostList = (props) => {
    // const [ allPosts, setAllPosts ] = useState([])
    const navigate = useNavigate()
    const { posts: allPosts, isLoading } = usePosts();

    // useEffect(() => {
    //     getAllPosts().then(data => setAllPosts(data))
    // }, [])


    return (
        <article className="container">
            <h2 className="header">News</h2>
                {
                    isStaff()
                    ?
                    <button className="button"
                        onClick={() => {
                            navigate({ pathname: "/posts/new" })
                        }}
                    >Create Post</button>
                    : ""

                }

            
            {
                allPosts.map(post => {
                    return <section key={`post--${post.id}`} className="row">
                        <div className="col-sm-3">
                                <a href={`posts/${post.id}`} className="card-img-actions">
                                    <img src={post.image} width="96" height="350" alt="" />
                                </a>
                        </div>
                        <div className="col-6">
                                <a href={`posts/${post.id}`}>
                                    <h2 id="postHeader">{post.title}</h2>
                                </a>
                                <div>By {post.user.full_name}</div>
                                {
                                    isStaff()
                                    ?
                                    <div className="button-container">
                                        <button className="delete" onClick={() => deletePost(post.id).then(window.location.reload())}>Delete</button> 
                                        <button className="edit" onClick={() => {navigate({ pathname: `/postUpdate/${post.id}` })}}>Edit</button>
                                    </div>

                                    :
                                    ""
                                }
                        </div>
                        
                    </section>


                })
            }
        </article>
    )
}