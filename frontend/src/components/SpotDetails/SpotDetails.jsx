import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSpot } from "../../store/spots"
import { fetchSpotReviews } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import './SpotDetails.css'
import CreateReview from "../CreateReview"

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews))
    const images = spot?.SpotImages

    const reviewStr = reviews.length > 1 ? 'reviews' : 'review'

    useEffect(() => {
        dispatch(fetchSpot(spotId))
        dispatch(fetchSpotReviews(spotId))
    }, [dispatch, spotId])

    return (
        <div className="spot-details-container">
            <div className="spot-header">
                <h2>{spot?.name}</h2>
                <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            </div>
            <div className="spot-img-container">
                {images?.map((image, index) => (
                    <img src={image.url} alt={spot?.name} key={image.id} className={`spot-img-${index}`} />
                ))}
            </div>
            <div className="spot-details">
                <div className="spot-description">
                    <h3>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h3>
                    <p>{spot?.description}</p>
                </div>
                <div className="reserve-container">
                    <div className="reserve-top">
                        <p>${spot?.price} night</p>
                        {spot?.numReviews === 0 && (
                            <p><i className="fa-solid fa-star"/>New</p>
                        )}
                        {spot?.numReviews > 0 && (
                            <div className="reserve-top-right">
                                <p><i className="fa-solid fa-star"/> {Number(spot?.avgStarRating).toFixed(1)}</p>
                                <p>{spot?.numReviews} {reviewStr}</p>
                            </div>
                        )}
                    </div>
                    <button className="reserve-btn">Reserve</button>
                </div>
            </div>
            <div className="reviews-container">
                {!reviews.length && (
                    <div>
                        <p><i className="fa-solid fa-star" />New</p>
                        <OpenModalButton
                            buttonText='Post Your Review'
                            modalComponent={<CreateReview />}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpotDetails
