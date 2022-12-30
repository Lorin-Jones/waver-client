import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import {createGearType, getGearTypes, getManufacturers, getSingleGear, updateGear, createManufacturer } from '../../managers/GearManager.js'


export const GearEdit = () => {
    const navigate = useNavigate()
    const [gear, setGear] = useState([])
    const [newGear, setNewGear] = useState({
        name: "",
        image: "",
        price: 0,
        description: ""
        
    })
    const [gearTypes, setGearTypes] = useState([])
    const [manufacturers, setManufacturers] = useState([])
    const [showTypeEdit, setShowTypeEdit] = useState(false)
    const [showManufacturerEdit, setManufacturerEdit] = useState(false)
    const [newGearType, setNewGearType] = useState({
        name: ""
    })
    const [newManufacturer, setNewManufacturer] = useState({
        name: ""
    })
    let {gearId} = useParams()

    
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
        getSingleGear(gearId).then(singleGearData => {
            const convertedGear = {
                name: singleGearData['name'],
                image: singleGearData['image'],
                price: singleGearData['price'],
                description: singleGearData['description'],
                releaseDate: singleGearData['release_date'],
                manufacturerId: singleGearData['manufacturer']['id'],
                gearTypeId: singleGearData['gear_type']['id'],
                
            }
            setGear(convertedGear)})
        
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


    const submitNewCategory = (evt) => {
        evt.preventDefault()
        createGearType(newGearType).then(() => getGearTypes().then(gearTypeData => setGearTypes(gearTypeData)).then(setShowTypeEdit(false)))
    }

    const submitNewManufacterer = (evt) => {
        evt.preventDefault()
        createManufacturer(newManufacturer).then(() => getManufacturers().then(manufacturerData => setManufacturers(manufacturerData)).then(setManufacturerEdit(false)))
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
                    <label htmlFor="releaseDate">Released: </label>
                    <input type="number" min="1964" name="releaseDate" required autoFocus className="form-control" 
                        value={gear?.releaseDate}
                        onChange={changeGearState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="manufacturerId"></label>
                    <select
                    value={gear?.manufacturerId}
                    className="form_select"
                    onChange={changeGearState}
                    name="manufacturerId"
                    required autoFocus>
                    <option value="0">Select Manufacturer</option>
                    {manufacturers.map(
                        (manufacturer) => {
                            return <option className="form-option" value={`${manufacturer.id}`}>{manufacturer.name}</option>
                        }
                    )
                    }
                    </select>
                </div>
                <button onClick={evt => {
                    evt.preventDefault();
                    Promise.resolve().then(() => setManufacturerEdit(!showManufacturerEdit));
                    }}>Add Manufacturer</button>
                    {
                        showManufacturerEdit
                        ?
                        <>
                            <div className="form-group">
                                <input type="text" name="name" required autoFocus className="form-control"
                                    value={newManufacturer.name}
                                    onChange={(evt) => {
                                        const copy = {...newManufacturer}
                                        copy.name = evt.target.value
                                        setNewManufacturer(copy)
                                    }}/>
                            </div>
                            <button onClick={submitNewManufacterer} className="btn btn-primary">
                                Save Manufacturer
                            </button>
                        </>
                            :
                            ""
                        }


            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="gearTypeId"></label>
                    <select
                    value={gear?.gearTypeId}
                    className="form_select"
                    onChange={changeGearState}
                    name="gearTypeId"
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
                <button onClick={evt => {
                    evt.preventDefault();
                    Promise.resolve().then(() => setShowTypeEdit(!showTypeEdit));
                    }}>Add Category</button>
                {
                    showTypeEdit
                    ?
                    <>
                    <div className="form-group">
                        <input type="text" name="name" required autoFocus className="form-control"
                            value={newGearType.name}
                            onChange={(evt) => {
                                const copy = {...newGearType}
                                copy.name = evt.target.value
                                setNewGearType(copy)
                            }}/>
                    </div>
                    <button onClick={submitNewCategory} className="btn btn-primary">
                        Save Category
                    </button>
                    </>
                    :
                    ""
                }


            </fieldset>
          

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGear = {
                        name: newGear.name,
                        image: newGear.image,
                        price: parseInt(newGear.price),
                        description: newGear.description,
                        release_date: parseInt(newGear.release_date),
                        manufacturer: parseInt(newGear.manufacturer),
                        gear_type: parseInt(newGear.gear_type)
                    }

                    // Send POST request to your API
                    updateGear(updatedGear, gearId)
                        .then(() => navigate("/gear"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
