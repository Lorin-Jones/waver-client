import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGear, getGearTypes, getManufacturers } from '../../managers/GearManager.js'
import { Button } from "react-bootstrap"


export const GearForm = () => {
    const navigate = useNavigate()
    const [gearTypes, setGearTypes] = useState([])
    const [manufacturers, setManufacturers] = useState([])

   
    const [currentGear, setCurrentGear] = useState({
       name: "",
       image: "",
       price: 0,
       description: "",
       releaseDate: "",
       numberOfKeys: "",
       voices: "",
       arpeggiator: false,
       sequencer: false,
       velocity: false,
       aftertouch: false,
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

    const isChecked = (domEvent) => {
        const newGear = Object.assign({}, currentGear)
        if (domEvent.target.checked === true) {
            newGear[domEvent.target.name] = true
        } else {
            newGear[domEvent.target.name] = false
        }
        setCurrentGear(newGear)
    }


    return (
        <section className="formStyles">
            <form className="gearForm">
                <div className="formBlock">
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
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <img src={currentGear.image} className="gearImage" />
                            <Button
                                style={{width: '160px'}}
                                onClick={(clickEvent) => showWidget(clickEvent)}
                                className="btn btn-primary">
                                Add Image
                            </Button>
                        </div>
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
                            <input type="number" min="1964" name="releaseDate" required autoFocus className="form-control"
                                value={currentGear.releaseDate}
                                onChange={changeGearState}
                                />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="numberOfKeys">Number of Keys</label>
                            <input type="text" name="numberOfKeys" required autoFocus className="form-control"
                                value={currentGear.numberOfKeys}
                                onChange={changeGearState}
                                />    
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="voices">Voices</label>
                            <input type="text" name="voices" required autoFocus className="form-control"
                                value={currentGear.voices}
                                onChange={changeGearState}
                                />    
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="specifications">
                            <div className="checkBox">
                                <label htmlFor="arpeggiator">Arpeggiator</label>
                                <input type="checkbox" name="arpeggiator" value={currentGear.arpeggiator} required autoFocus
                                    onChange={isChecked}
                                    />
                            </div>
                            <div className="checkBox">
                                <label htmlFor="sequencer">Sequencer</label>
                                <input type="checkbox" name="sequencer" value={currentGear.sequencer} required autoFocus
                                    onChange={isChecked}
                                    />
                            </div>
                            <div className="checkBox">
                                <label htmlFor="velocity">Velocity</label>
                                <input type="checkbox" name="velocity" value={currentGear.velocity} required autoFocus
                                    onChange={isChecked}
                                    />
                            </div>
                            <div className="checkBox">
                                <label htmlFor="aftertouch">Aftertouch</label>
                                <input type="checkbox" name="aftertouch" value={currentGear.aftertouch} required autoFocus
                                    onChange={isChecked}
                                    />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div style={{ paddingBottom: '16px'}}>
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
                        <div style={{ paddingBottom: '16px'}}>
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
                                number_of_keys: currentGear.numberOfKeys,
                                voices: currentGear.voices,
                                arpeggiator: currentGear.arpeggiator,
                                sequencer: currentGear.sequencer,
                                velocity: currentGear.velocity,
                                aftertouch: currentGear.aftertouch,
                                manufacturer: parseInt(currentGear.manufacturerId),
                                gear_types: parseInt(currentGear.gearTypeId)
                            }
                            
                            // Send POST request to your API
                            createGear(gear)
                            .then(() => navigate("/gear"))
                        }}
                        className="btn btn-primary">Create</button>
                </div>
            </form>
        </section>
    )
}
