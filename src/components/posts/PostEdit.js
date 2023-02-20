import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSinglePost, updatePost } from "../../managers/PostManager.js"


export const PostEdit = () => {
    const navigate = useNavigate()
    let {postId} = useParams()
    const [post, setPost] = useState({
        image: "",
        title: "",
        publicationDate: "",
        content: ""
    })

    const [text, setText] = useState("")
    
    useEffect(() => {
        getSinglePost(postId).then(singlePostData => {
            const convertedPost = {
                user: singlePostData['name'],
                image: singlePostData['image'],
                title: singlePostData['title'],
                publicationDate: singlePostData['publication_date'],
                content: singlePostData['content'],
                
            }
            setPost(convertedPost)})
        
    }, [])

    useEffect(() => {
        setText(post.content)
    }, [post])
    
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: `dlr2tm7qr`,
            uploadPreset: `w2vtre3r`}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(post) 
            copy.image = result.info.url
            setPost(copy)
        }});
        widget.open()
        }


    const changePostState = (domEvent) => {
        const copy = { ...post }
        copy[domEvent.target.name] = domEvent.target.value
        setPost(copy)
        // TODO: Complete the onChange function

    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={post.title}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <img src={post.image} />
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Edit Image
                </button>
            </fieldset>
            
            <fieldset>
                <label htmlFor="content">Content </label>
                <CKEditor
                    editor={ ClassicEditor } 
                    data={text}
                    onReady={ editor => {
                        editor.setData(text)
                      }}
                    onChange={(evt, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}
                    />
                
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newPost = {
                        title: post.title,
                        image: post.image,
                        publication_date: post.publicationDate,
                        content: text,
                    }

                    // Send POST request to your API
                    updatePost(newPost, postId)
                        .then(() => navigate(`/posts/${postId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}


        