import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSpot } from "../../store/spots"
import { fetchSpotReviews } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton/OpenModalButton"

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews))
    const images = spot?.SpotImages

    useEffect(() => {
        dispatch(fetchSpot(spotId))
        dispatch(fetchSpotReviews(spotId))
    }, [dispatch, spotId])

    console.log(reviews)

    return (
        <div>
            <h2>{spot?.name}</h2>
            <h4>{spot?.city}, {spot?.state}, {spot?.country}</h4>
            <div>
                {images?.map(image => (
                    <img src={image.url} alt={spot?.name} key={image.id} />
                ))}
            </div>
            <div>
                <h3>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h3>
                <p>{spot?.description}</p>
                <div>
                    <p>${spot?.price} night</p>
                    <p>* {spot?.avgRating}</p>
                    <p>{spot?.numReviews}</p>
                    <button>Reserve</button>
                </div>
            </div>
            <div>
                {!reviews.length && (
                    <div>
                        <h2><i className="fa-solid fa-star"/>New</h2>
                        <OpenModalButton
                            buttonText='Post Your Review'
                        />
                    </div>
                )}
                {reviews.length &&
                    reviews.map(review => {
                        <h3>{review.User.firstName} {review.User.lastName}</h3>
                    })
                }
            </div>
        </div>
    )
}

export default SpotDetails
