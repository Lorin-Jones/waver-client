import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGear, deleteGear } from "../../managers/GearManager.js"

export const GearList = (props) => {
    const [ gear, setGear ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getGear().then(data => setGear(data))
    }, [])

    return (
        <article className="gear">
            <h2 className="header">Gear</h2>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/gear/new" })
                }}
            >Register New Gear</button>
            {
                gear.map(gearItem => {
                    return <section key={`gear--${gearItem.id}`} className="gear">
                        <Link to={`${gearItem.id}`} className="gear__title">{gearItem.manufacturer.name} {gearItem.name}</Link>
                        <div className="gear__price">MSRP: {gearItem.price}</div>
                        <div className="gear__description">{gearItem.description}</div>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => {
                                navigate({ pathname: `/gearUpdate/${gearItem.id}` })
                            }}
                        >Edit</button>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => { deleteGear(gearItem.id).then(window.location.reload()) }}
                        >Delete</button>
                    </section>
                })
            }
        </article>
    )
}