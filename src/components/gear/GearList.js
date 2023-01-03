import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGear, deleteGear, getGearTypes, getGearByType, getGearBySearch } from "../../managers/GearManager.js"
import { isStaff } from "../../utils/isStaff.js"



export const GearList = (props) => {
    const [ gear, setGear ] = useState([])
    const [gearTypes, setGearTypes] = useState([])
    const [filtered, setFiltered] = useState()
    const [searchInput, setSearchInput] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (filtered !== 0 && filtered !== undefined) {
            getGearByType(filtered).then(data => setGear(data))
        } else if (filtered === undefined || filtered === 0) {
            getGear().then(data => setGear(data))
        }
    }, [filtered])

    useEffect(() => {
        getGearTypes().then(data => setGearTypes(data))
    }, [])

    document.addEventListener(
        "change",
        (event) => {
            if (event.target.value !== 0) {
                setFiltered(parseInt(event.target.value))
            }
        }
    )

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      }

    return (
        <article className="gear">
            <section className="gearHeader">

                <h2 className="header">Gear</h2>
                    {
                        isStaff()
                        ?
                        <button className="button"
                            onClick={() => {
                                navigate({ pathname: "/gear/new" })
                            }}
                        >Register New Gear</button>
                        :
                        ""

                    }
                {   
                    <>
                    <section className="gearSearch">
                        <select id="gear_type">
                            <option value="0" name="gear_type">Browse By Gear Type</option>
                            {
                                gearTypes.map(
                                    (gearType) => {
                                    return <option name="gear_type" value={gearType.id}>{gearType.name}</option>
                                    }
                                )
                            }
                            
                        </select>
                        <input
                            type="text"
                            placeholder="Search here"
                            onChange={handleChange}
                            value={searchInput} />
                            <button className="button"
                                        onClick={(evt) => {
                                            evt.preventDefault(); 
                                            getGearBySearch(searchInput)
                                            .then(data => setGear(data))}}
                                        >Search</button>
                        <button className="button"
                                        onClick={(evt) => {
                                            evt.preventDefault(); 
                                            window.location.reload()}}
                                        >All Gear</button>

                    </section>

                                            
                    </>
                }
            </section>
            <section class="gearGrid">

                    <div class="row">
                        {
                            gear.map(gearItem => {
                                return <section key={`gear--${gearItem.id}`} className="col-md-4 mt-2">
                                    <div class="card">
                                        <div class="card-body">
                                            <a href={`gear/${gearItem.id}`} className="card-img-actions">
                                                <img src={gearItem.image} class="card-img img-fluid" width="96" height="350" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-body bg-light text-center">
                                        <div class="mb-2">
                                            <h6 class="font-weight-semibold mb-2">
                                                <a href={`gear/${gearItem.id}`} className="text-default mb-2" data-abc="true">
                                                    {gearItem.specifications.manufacturer.name} {gearItem.name}</a>
                                            </h6>
                                            <div class="text-muted" data-abc="true">{gearItem?.specifications?.gear_types?.name}</div>
                                        </div>

                                            <h3 className="mb-0 font-weight-semibold">${gearItem.price}</h3>

                                            {
                                                isStaff()
                                                ?
                                                <>
                                                    <button className="button"
                                                        onClick={() => {
                                                            navigate({ pathname: `/gearUpdate/${gearItem.id}` })
                                                        }}
                                                        >Edit</button>
                                                    <button className="button"
                                                        onClick={() => { deleteGear(gearItem.id).then(window.location.reload()) }}
                                                        >Delete</button>
                                                
                                                </>
                                                : ""
                                                
                                            }


                                    </div>
                                </section>
                            })
                        }
                    </div>
            </section>
        </article>
    )
}

