import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSinglePost } from "../../managers/PostManager"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPostDetails] = useState({})
    

    useEffect(
        () => {
            getSinglePost(postId).then(setPostDetails)
        },
        []
    )


    return <article key={`postDetails--${post.id}`} className="used_gear">
                        
                        <section id={`${post.id}`} className="gear__title">
                                <img src={post.image} />
                                <h2 className="post__title">{post.title}</h2>
                                <div className="post__author">By {post?.user?.full_name}</div>
                                <div dangerouslySetInnerHTML={{__html: post.content}} />
                        </section>
                    </article>
    
}
