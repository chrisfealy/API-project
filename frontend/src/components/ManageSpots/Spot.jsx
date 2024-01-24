import { Link } from "react-router-dom"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteSpot from "../DeleteSpot/DeleteSpot"

function Spot({ spot }) {
  return (
    <div className="spot-card">
        <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name} className="spot-card-image" />
        </Link>
        <p>{spot.city}, {spot.state} <i className="fa-solid fa-star"></i>{spot.avgRating || `New`}</p>
        <p>${spot.price} night</p>
        <div className="btn-div">
            <Link to={`/spots/${spot.id}/edit`}>Update</Link>
            {/* <Link>Delete</Link> */}
            <OpenModalButton
              modalComponent={<DeleteSpot spot={spot} />}
              buttonText='Delete'
            />
        </div>
    </div>
  )
}

export default Spot
