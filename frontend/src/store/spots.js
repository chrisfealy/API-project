import { csrfFetch } from "./csrf"

// Action Type Constants
export const LOAD_SPOTS = 'spots/LOAD_SPOTS'
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const REMOVE_SPOT = 'spots/REMOVE_SPOT'

// Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot
})

export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

const spotsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const spotsState = {};
            action.spots.Spots.forEach((spot) => {
              spotsState[spot.id] = spot;
            });
            return spotsState;
          }
        default:
            return state
    }
}

export default spotsReducer
