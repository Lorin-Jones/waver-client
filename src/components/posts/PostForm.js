import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../managers/PostManager.js'
import "./posts.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const PostForm = () => {
    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [currentPost, setCurrentPost] = useState({
        title: "",
        image: ""
    })
    
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: `dlr2tm7qr`,
            uploadPreset: `w2vtre3r`}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(currentPost) 
            copy.image = result.info.url
            setCurrentPost(copy)
        }});
        widget.open()
        }


    const changePostState = (domEvent) => {
        const newPost = Object.assign({}, currentPost)
        newPost[domEvent.target.name] = domEvent.target.value
        setCurrentPost(newPost)
        // TODO: Complete the onChange function

    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Write a Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentPost.title}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <img src={currentPost.image} />
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Add Image
                </button>
            </fieldset>
            
            <fieldset>
                <label htmlFor="content">Content </label>
                <CKEditor
                    editor={ ClassicEditor } 
                    data={text}
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

                    const post = {
                        title: currentPost.title,
                        image: currentPost.image,
                        content: text,
                    }

                    // Send POST request to your API
                    createPost(post)
                        .then(() => navigate("/posts"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
