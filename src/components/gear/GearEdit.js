import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import {getGearTypes, getManufacturers, getSingleGear, updateGear } from '../../managers/GearManager.js'


export const GearEdit = () => {
    const navigate = useNavigate()
    const [gear, setGear] = useState({})
    const [gearTypes, setGearTypes] = useState([])
    const [manufacturers, setManufacturers] = useState([])
    let {gearId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: `dlr2tm7qr`,
            uploadPreset: `w2vtre3r`}, 
        (error, result) => {
            if (!error && result && result.event === "success") { 
            console.log(result.info.url)
            const copy = structuredClone(gear) 
            copy.image = result.info.url
            setGear(copy)
        }});
        widget.open()
        }

    useEffect(() => {
        getSingleGear(gearId).then(singleGearData => setGear(singleGearData))
    }, [])

    useEffect(() => {
        
        getGearTypes().then(gearTypeData => setGearTypes(gearTypeData))
        getManufacturers().then(manufacturerData => setManufacturers(manufacturerData))
        // TODO: Get the gear types, then set the state
    }, [])


    const changeGearState = (domEvent) => {
        const copy = { ...gear }
        copy[domEvent.target.name] = domEvent.target.value
        setGear(copy)
        // TODO: Complete the onChange function

    }

    return (
        <form className="gearForm">
            <h2 className="gearForm__title">Edit Gear</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={gear.name}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <img src={gear.image}></img>
                </div>
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Edit Image
                </button>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">MSRP: </label>
                    <input type="number" name="price" required autoFocus className="form-control"
                        value={gear.price}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Overview: </label>
                    <input type="textarea" name="description" required autoFocus className="form-control"
                        value={gear.description}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="release_date">Released: </label>
                    <input type="date" name="release_date" required autoFocus className="form-control"
                        value={gear.releaseDate}
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
                    name="manufacturer"
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
                    name="gear_type"
                    required autoFocus>
                    <option value="0">Gear Type</option>
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

                    const updatedGear = {
                        name: gear.name,
                        image: gear.image,
                        price: parseInt(gear.price),
                        description: gear.description,
                        release_date: parseInt(gear.release_date),
                        manufacturer: parseInt(gear.manufacturer),
                        gear_type: parseInt(gear.gear_type)
                    }

                    // Send POST request to your API
                    updateGear(updatedGear, gearId)
                        .then(() => navigate("/gear"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
