import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGear, getGearTypes, getManufacturers } from '../../managers/GearManager.js'
import { createUsedGear } from "../../managers/UsedManager.js"


export const UsedGearForm = () => {
    const navigate = useNavigate()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

   
    const [currentUsedGear, setCurrentUsedGear] = useState({
        item: "",
        image: "",
        price: 0,
        details: "",

    })
    
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: `dlr2tm7qr`,
            uploadPreset: `w2vtre3r`}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(currentUsedGear) 
            copy.image = result.info.url
            setCurrentUsedGear(copy)
        }});
        widget.open()
        }


    const changeGearState = (domEvent) => {
        const newGear = Object.assign({}, currentUsedGear)
        newGear[domEvent.target.name] = domEvent.target.value
        setCurrentUsedGear(newGear)
        // TODO: Complete the onChange function

    }

    return (
        <form className="gearForm">
            <h2 className="gearForm__title">List an Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="item">Item: </label>
                    <input type="text" name="item" required autoFocus className="form-control"
                        value={currentUsedGear.item}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <img src={currentUsedGear.image} />
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Add Image
                </button>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Asking Price</label>
                    <input type="number" name="price" required autoFocus className="form-control"
                        value={currentUsedGear.price}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="details">Details </label>
                    <input type="textarea" name="details" required autoFocus className="form-control"
                        value={currentUsedGear.details}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const gear = {
                        item: currentUsedGear.item,
                        image: currentUsedGear.image,
                        price: parseInt(currentUsedGear.price),
                        details: currentUsedGear.details,
                    }

                    // Send POST request to your API
                    createUsedGear(gear)
                        .then(() => navigate("/used_gear"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
