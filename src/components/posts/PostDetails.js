import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSinglePost } from "../../managers/PostManager"
import "./posts.css"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPostDetails] = useState({})
    

    useEffect(
        () => {
            getSinglePost(postId).then(setPostDetails)
        },
        []
    )


    return <article key={`postDetails--${post.id}`} className="postDetailPage">
                        
                        <section id={`${post.id}`} className="postDetailSection">
                            <div class="image-container">
                                <img src={post.image} />
                            </div>
                            <div class="post-container">
                                <h2 className="post__title">{post.title}</h2>
                                <div className="post__author">By {post?.user?.full_name}</div>
                                <div dangerouslySetInnerHTML={{__html: post.content}} />
                            </div>
                        </section>
                    </article>

    
}
