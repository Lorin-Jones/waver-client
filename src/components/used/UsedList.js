import { Button } from "bootstrap"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUsedGear, deleteUsedGear } from "../../managers/UsedManager.js"
import { isStaff } from "../../utils/isStaff.js"
import "./usedGear.css" 



export const UsedGearList = (props) => {
    const [ used_gear, setUsedGear ] = useState([])
    const [filtered, setFiltered] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        
            getUsedGear().then(data => setUsedGear(data))
    }, [filtered])


    // document.addEventListener(
    //     "change",
    //     (event) => {
    //         if (event.target.value !== 0) {
    //             setFiltered(parseInt(event.target.value))
    //         }
    //     }
    // )

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    //   }

    return (
        <article className="gear">
            <h2 className="header">Used Gear</h2>
                {
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            navigate({ pathname: "/used_gear/new" })
                        }}
                    >List Gear</button>

                }

            <section className="container-fluid">   
                <div class="row">
                    {
                        used_gear.map(gearItem => {
                            return <section key={`gear--${gearItem.id}`} className="col-sm-4">
                                        <div class="card h-200">
                                            <div class="card-body">
                                                <div id={`used/${gearItem.id}`} className="used__title">
                                                    <img src={gearItem.image} class="card-img img-fluid" width="96" height="350" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body bg-light text-center">
                                            <div class="mb-2">
                                                <h6 class="font-weight-semibold mb-2">
                                                    <div id={`used/${gearItem.id}`} className="text-default mb-2" data-abc="true">
                                                    {gearItem.item}</div>
                                                </h6>

                                            </div>
                                        </div>
                                                    
                                                <h3 className="mb-0 font-weight-semibold">{gearItem.price}</h3>
                                                <div className="gear__user">Seller: {gearItem.waver_user.user.username}</div>
                                                <button>Message Seller</button>

                                    </section>
                            
                        
                        })
                    }

                </div>

            </section>
        </article>
    )
}