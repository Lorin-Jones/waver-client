import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deletePost, getAllPosts } from "../../managers/PostManager.js"
import { isStaff } from "../../utils/isStaff.js"
import "./posts.css"
import { usePosts } from "../../queries/posts.js"
import { Button } from "react-bootstrap"



export const PostList = (props) => {
    // const [ allPosts, setAllPosts ] = useState([])
    const navigate = useNavigate()
    const { posts: allPosts } = usePosts();
    const staff = isStaff()

    // useEffect(() => {
    //     getAllPosts().then(data => setAllPosts(data))
    // }, [])


    return (
        <article className="container">
            <div className="post-container">
                <div className="header-container">
                    <h2 className="news-header">News</h2>
                        {
                            staff
                            &&
                            <Button className="button"
                            onClick={() => {
                                navigate({ pathname: "/posts/new" })
                            }}
                            >Create Post</Button>
                        }
                </div>
                <div style={{ paddingTop: '24px'}}>
                    {
                        allPosts?.map(post => {
                            return <section key={`post--${post.id}`} className="postRow">
                                        <div className="image-container">
                                                <a href={`posts/${post.id}`}>
                                                    <img src={post.image} alt="post" className="image"/>
                                                </a>
                                        </div>
                                        <div className="content">
                                                <div>
                                                    <a href={`posts/${post.id}`}>
                                                        <h2 id="postHeader">{post.title}</h2>
                                                    </a>
                                                    <div>By {post.user.full_name}</div>
                                                </div>
                                                {
                                                    staff
                                                    &&
                                                    <div className="button-container">
                                                        <Button className="actionButton" onClick={() => deletePost(post.id).then(window.location.reload())}>Delete</Button> 
                                                        <Button className="actionButton" onClick={() => {navigate({ pathname: `/postUpdate/${post.id}` })}}>Edit</Button>
                                                    </div>
                                                }
                                        </div>    
                                    </section>
                    })
                }
                </div>
            </div>
        </article>
    )
}