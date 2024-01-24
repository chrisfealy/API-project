import { csrfFetch } from "./csrf"

export const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'

export const getSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(getSpotReviews(reviews))
        return reviews
    }
}

const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_SPOT_REVIEWS: {
            const reviewsState = {}
            action.reviews.Reviews.forEach((review) => {
                reviewsState[review.id] = review
            })
            return reviewsState
        }
        default:
            return state
    }
}

export default reviewsReducer
