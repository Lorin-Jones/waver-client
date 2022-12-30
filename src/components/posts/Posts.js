import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllPosts } from "../../managers/PostManager.js"
import { isStaff } from "../../utils/isStaff.js"



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
                        
                        <Link to={`${post.id}`} className="post__title">
                            <img src={post.image} />
                            <h2>{post.title}</h2></Link>
                    </section>
                })
            }
        </article>
    )
}