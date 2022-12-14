import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGear, getGearTypes, getManufacturers } from '../../managers/GearManager.js'


export const GearForm = () => {
    const navigate = useNavigate()
    const [gearTypes, setGearTypes] = useState([])
    const [manufacturers, setManufacturers] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

   
    const [currentGear, setCurrentGear] = useState({
       name: "",
       image: "",
       price: 0,
       description: "",
       releaseDate: "",
       manufacturerId: 0,
       gearTypeId: 0
    })
    
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: `dlr2tm7qr`,
            uploadPreset: `w2vtre3r`}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(currentGear) 
            copy.image = result.info.url
            setCurrentGear(copy)
        }});
        widget.open()
        }

    useEffect(() => {
        getGearTypes().then(gearTypeData => setGearTypes(gearTypeData))
        getManufacturers().then(manufacturerData => setManufacturers(manufacturerData))
        // TODO: Get the gear types, then set the state
    }, [])

    const changeGearState = (domEvent) => {
        const newGear = Object.assign({}, currentGear)
        newGear[domEvent.target.name] = domEvent.target.value
        setCurrentGear(newGear)
        // TODO: Complete the onChange function

    }

    return (
        <form className="gearForm">
            <h2 className="gearForm__title">Register New Gear</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGear.name}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Add Image
                </button>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">MSRP: </label>
                    <input type="number" name="price" required autoFocus className="form-control"
                        value={currentGear.price}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Overview: </label>
                    <input type="textarea" name="description" required autoFocus className="form-control"
                        value={currentGear.description}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="release_date">Released: </label>
                    <input type="date" name="releaseDate" required autoFocus className="form-control"
                        value={currentGear.releaseDate}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="manufacturer"></label>
                    <select
                    className="form_select"
                    onChange={changeGearState}
                    name="manufacturerId"
                    required autoFocus>
                    <option value="0">Manufacturer</option>
                    {manufacturers.map(
                        (manufacturer) => {
                            return <option className="form-option" value={`${manufacturer.id}`}>{manufacturer.name}</option>
                        }
                    )
                    }
                    </select>
                </div>


            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="gear-type"></label>
                    <select
                    className="form_select"
                    onChange={changeGearState}
                    name="gearTypeId"
                    required autoFocus>
                    <option value="0">Choose Type</option>
                    {gearTypes.map(
                        (type) => {
                            return <option className="form-option" value={`${type.id}`}>{type.name}</option>
                        }
                    )
                    }
                    </select>
                </div>


            </fieldset>
          

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const gear = {
                        name: currentGear.name,
                        image: currentGear.image,
                        price: parseInt(currentGear.price),
                        description: currentGear.description,
                        release_date: parseInt(currentGear.releaseDate),
                        manufacturer: parseInt(currentGear.manufacturerId),
                        gear_type: parseInt(currentGear.gearTypeId)
                    }

                    // Send POST request to your API
                    createGear(gear)
                        .then(() => navigate("/gear"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
