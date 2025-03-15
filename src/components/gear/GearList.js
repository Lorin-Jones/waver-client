import { useNavigate } from "react-router-dom";
import {
  deleteGear,
} from "../../managers/GearManager.js";
import "./gear.css";
import { useGear } from "../../queries/gear.js";
import { isStaff } from "../../utils/isStaff.js";
import { Button } from "react-bootstrap";

export const GearList = () => {
//   const [gearTypes, setGearTypes] = useState([]);
//   const [filtered, setFiltered] = useState();
//   const [searchInput, setSearchInput] = useState("");
  const gear = useGear()
  const staff = isStaff()

  const navigate = useNavigate();


  // useEffect(() => {
  //     if (filtered !== 0 && filtered !== undefined) {
  //         getGearByType(filtered).then(data => setGear(data))
  //     } else if (filtered === undefined || filtered === 0) {
  //         getGear().then(data => setGear(data))
  //     }
  // }, [filtered])

//   useEffect(() => {
//     getGearTypes().then((data) => setGearTypes(data));
//   }, []);

  // document.addEventListener(
  //     "change",
  //     (event) => {
  //         if (event.target.value !== 0) {
  //             setFiltered(parseInt(event.target.value))
  //         }
  //     }
  // )

//   const handleChange = (e) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };


  return (
    <article className="gear">
        <section className="gearContainer">
            <section className="gearHeader">
                <h2 className="header">Gear</h2>
                {staff && (
                <Button
                className="button"
                    onClick={() => {
                    navigate({ pathname: "/gear/new" });
                    }}
                >
                    Register New Gear
                </Button>
                )}
                {/* {
                <>
                <section className="gearSearch">
                <select id="gear_type">
                <option value="0" name="gear_type">
                        Browse By Gear Type
                        </option>
                        {gearTypes.map((gearType) => {
                        return (
                            <option
                            key={gearType.id}
                            name="gear_type"
                            value={gearType.id}
                            >
                            {gearType.name}
                            </option>
                            );
                            })}
                    </select>
                    <input
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput}
                    />
                    <button
                    className="button"
                    onClick={(evt) => {
                        evt.preventDefault();
                        getGearBySearch(searchInput).then((data) => setGear(data));
                        }}
                    >
                        Search
                        </button>
                        <button
                        className="button"
                        onClick={(evt) => {
                            evt.preventDefault();
                            window.location.reload();
                        }}
                        >
                        All Gear
                    </button>
                    </section>
                </>
                } */}
            </section>
            <section className="grid-container">
                {gear?.map((gearItem) => {
                    return (
                    <section key={`gear--${gearItem?.id}`} className="grid-item">
                        <div className="gear-card">
                            <a href={`gear/${gearItem.id}`} className="image-link">
                                <img
                                src={gearItem.image}
                                alt=""
                                />
                            </a>
                        </div>
                        <div className="gear-body">
                            <h6 class="card-title">
                                <a href={`gear/${gearItem?.id}`}>
                                {gearItem?.specifications?.manufacturer?.name}{" "}
                                {gearItem?.name}
                                </a>
                            </h6>
                            <div class="card-text">
                                {gearItem?.specifications?.gear_types?.name}
                            </div>

                            <h3 className="mb-0 font-weight-semibold">
                                ${gearItem.price}
                            </h3>

                            {staff && (
                                <div className="buttonGroup">
                                    <Button
                                    className="actionButtons"
                                        type="button"
                                        onClick={() => {
                                            navigate({ pathname: `/gearUpdate/${gearItem.id}` });
                                        }}
                                        >
                                        Edit
                                    </Button>
                                    <Button
                                        type="actionButtons"
                                        onClick={() => {
                                            deleteGear(gearItem.id).then(
                                                window.location.reload()
                                            );
                                        }}
                                        >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                    );
                })}
            </section>
        </section>
    </article>
  );
};
