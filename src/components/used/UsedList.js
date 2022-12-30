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

            
            {
                used_gear.map(gearItem => {
                    return <section key={`gear--${gearItem.id}`} className="gear">
                        
                        <Link to={`${gearItem.id}`} className="gear__title">
                            <img src={gearItem.image} />
                            {gearItem.item} </Link>
                        <div className="gear__price">{gearItem.price}</div>
                        <div className="gear__user">{gearItem.waver_user.user.username}</div>
                    </section>
                })
            }
        </article>
    )
}